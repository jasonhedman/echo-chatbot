import NextAuth, { type DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';
import type { DefaultJWT } from 'next-auth/jwt';
import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

export type UserType = 'guest' | 'regular';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    email?: string | null;
    type: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

const baseUrl = '';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    {
      id: 'echo',
      name: 'Echo',
      type: 'oauth',
      clientId: process.env.NEXT_PUBLIC_ECHO_APP_ID,
      issuer: baseUrl,
      authorization: {
        url: `https://echo.merit.systems/api/oauth/authorize`,
        params: {
          scope: 'llm:invoke offline_access',
        },
      },
      token: `https://echo.merit.systems/api/oauth/token?client_id=${process.env.NEXT_PUBLIC_ECHO_APP_ID}`,
      userinfo: {
        url: `https://echo.merit.systems/api/oauth/userinfo`,
      },
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          type: 'regular',
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.type = user.type;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }

      return session;
    },
  },
});
