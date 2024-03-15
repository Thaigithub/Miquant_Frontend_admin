/* eslint-disable unused-imports/no-unused-imports */
import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      token?: string;
      uid?: number;
      type?: string;
    };
  }
}
