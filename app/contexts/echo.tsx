'use client';

import { EchoProvider as EchoProviderBase } from '@zdql/echo-react-sdk';

export const EchoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EchoProviderBase
      config={{
        // biome-ignore lint: <explanation>
        appId: process.env.ECHO_APP_ID!,
      }}
    >
      {children}
    </EchoProviderBase>
  );
};
