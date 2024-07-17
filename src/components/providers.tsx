'use client';

import { ThemeProvider } from 'next-themes';
import React, { PropsWithChildren } from 'react';
import { Toaster } from './ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Toaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
