import type { OAuthConfig } from 'next-auth/providers';

export const EchoProvider: OAuthConfig<any> = {
  id: 'echo',
  name: 'Echo',
  type: 'oauth',
  clientId: process.env.NEXT_PUBLIC_ECHO_APP_ID,
  issuer: 'https://echo.merit.systems',
  authorization: {
    url: `https://echo.merit.systems/api/oauth/authorize`,
    params: {
      scope: 'llm:invoke offline_access',
    },
  },
  token: {
    url: 'https://echo.merit.systems/api/oauth/token',
    async request({ request, url, body, headers }) {
      console.log('token', context);
      const tokens = await fetch(`${context.url}&hello=world`, {
        method: 'POST',
        body: JSON.stringify(context.data),
        headers: {
          Test: 'test',
        },
      });
      return tokens;
    },
  },
  userinfo: {
    url: 'https://echo.merit.systems/api/oauth/userinfo',
    // async request(context: any) {
    //   console.log('userinfo', context);
    //   const tokens = await fetch(`${context.url}`, {
    //     method: 'GET',
    //   });
    //   return tokens;
    // },
  },
  profile: (profile) => {
    console.log(profile);
    return {
      id: profile.sub,
      name: profile.name,
      type: 'regular',
    };
  },
};
