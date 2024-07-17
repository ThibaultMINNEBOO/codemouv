import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import LoggedInButton from '@/auth/LoggedInButton';
import { Layout } from '@/components/Layout';
import { PropsWithChildren } from 'react';
import Title from '@/components/Title';
import { Providers } from '@/components/providers';
import Link from 'next/link';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Codemouv',
  description: 'A beautiful app to search courses',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Layout className="border-b flex-row justify-between">
            <div className="mt-2">
              <Button
                size="sm"
                variant="ghost"
                className="flex justify-start items-center gap-2 font-bold"
                asChild
              >
                <Link href="/">
                  <Image
                    width={40}
                    height={40}
                    src="/icon.png"
                    alt="Codemouv's logo"
                  />
                  <Title className="text-lg" />
                </Link>
              </Button>
            </div>
            <div className="mr-2 mt-2">
              <LoggedInButton />
            </div>
          </Layout>
          {children}
        </Providers>
      </body>
    </html>
  );
}
