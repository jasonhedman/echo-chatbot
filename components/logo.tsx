import { type HTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  onClick?: () => void;
}

export const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ className, onClick, ...props }, ref) => {
    return (
      <>
        <Image
          ref={ref}
          src="/logo/light.svg"
          alt="Echo Chatbot Logo"
          className={cn('size-6 dark:hidden', className)}
          onClick={onClick}
          {...props}
        />
        <Image
          src="/logo/dark.svg"
          alt="Echo Chatbot Logo"
          className={cn('size-6 hidden dark:block', className)}
          onClick={onClick}
          {...props}
        />
      </>
    );
  },
);

Logo.displayName = 'Logo';
