import { cn } from '@/lib/utils';
import React from 'react';

export default function Title({ className }: { className?: string }) {
  return (
    <h1 className={cn('text-4xl font-bold', className)}>
      Code
      <span className="text-primary before:w-full before:absolute before:bottom-0 relative before:h-0.5 before:bg-primary">
        mouv
      </span>
    </h1>
  );
}
