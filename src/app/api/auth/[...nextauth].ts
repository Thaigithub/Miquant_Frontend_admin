import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials: any, req) {
          const { username, password } = credentials as any;
          const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          const { data } = await res.json();
          if (data.token && data.type.includes('ADMIN')) return data;
          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }: any) {
        if (user) {
          token.user = user;
        }
        return token;
      },
      async session({ session, token }: any) {
        const { user } = token;
        session.user = user;
        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
