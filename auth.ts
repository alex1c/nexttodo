import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: {
      label: 'User name (для теста можно использовать Alex)',
    },
    password: {
      label: 'Password (для теста можно использовать 123)',
      type: 'password',
    },
  },

  async authorize(credentials) {
    if (credentials.username === 'Alex' && credentials.password === '123')
      return {
        name: 'Alex',
      };
    else return null;
  },
  //}
});

const config = {
  providers: [Google, credentialsConfig],
  //в блоке ниже можно делать доп проверки на какие то страницы или параметры запроса
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      console.log('request----', request);
      if (pathname === '/middlewareProtected') return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
