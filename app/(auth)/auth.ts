import NextAuth, { type DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';
import type { DefaultJWT } from 'next-auth/jwt';
import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { getAccountByUserId, updateTokensByUserId } from '@/lib/db/queries';

export type UserType = 'guest' | 'regular';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    id: string;
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
          email: profile.email || '',
          image: profile.picture || '',
          type: 'regular',
        };
      },
    },
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const account = await getAccountByUserId({ userId: user.id });
      if (account?.expires_at && account.expires_at * 1000 < Date.now()) {
        // If the access token has expired, try to refresh it
        try {
          const response = await fetch(
            'https://echo.merit.systems/api/oauth/token',
            {
              method: 'POST',
              body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: account.refresh_token || '',
              }),
            },
          );

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token: string;
          };

          await updateTokensByUserId(user.id, {
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            refresh_token: newTokens.refresh_token,
          });
        } catch (error) {
          console.error('Error refreshing access_token', error);
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
});
