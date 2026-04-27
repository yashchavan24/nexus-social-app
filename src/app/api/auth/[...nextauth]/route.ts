import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? 'placeholder',
      clientSecret: process.env.GITHUB_SECRET ?? 'placeholder',
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
})

export { handler as GET, handler as POST }
