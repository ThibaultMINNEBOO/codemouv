import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { prisma } from './db';
import GithubProvider from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: '/icon.png',
    colorScheme: 'dark',
  },
  providers: [GithubProvider],
});
