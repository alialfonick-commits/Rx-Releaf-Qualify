import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: {
        email: string
        password: string
      } | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) throw new Error("User not found")

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!valid) throw new Error("Invalid password")

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.role = token.role
      session.user.id = token.id
      session.user.name = token.name
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}