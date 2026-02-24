import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim());

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    signIn: '/auth/signin',
  },
  events: {
    async createUser({ user }) {
      if (user.email && ADMIN_EMAILS.includes(user.email)) {
        await prisma.user.update({
          where: { id: user.id! },
          data: { role: 'ADMIN' },
        });
      }
    },
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as { role?: string }).role ?? 'USER';
      }
      return session;
    },
  },
});
