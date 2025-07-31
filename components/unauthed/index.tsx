import { signIn } from '@/app/(auth)/auth';
import { Button } from '../ui/button';
import { Logo } from '../logo';

export const UnauthedPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <Logo className="size-16" />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-bold">Welcome to Echo Chat</h1>
          <p className="text-lg text-muted-foreground">
            Connect your Account to Get Started
          </p>
        </div>
        <form
          action={async () => {
            'use server';
            await signIn('echo');
          }}
        >
          <Button>Sign in</Button>
        </form>
      </div>
    </div>
  );
};
