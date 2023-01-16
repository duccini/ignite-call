import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '../../../lib/prisma/next-adapter'

// simple initialization authOptions is an object
// advanced initialization authOptions is a function

export function buildNextAuthOption(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!, // assegura o TS que a variavel existira
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '', // se a variavel nao existir ''
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
      }),
      // ...add more providers here
    ],

    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar/?error=permissions'
        }

        return true
      },
    },
  }
}

// simple initialization
// export default NextAuth(authOptions)

// advanced initialization
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOption(req, res))
}
