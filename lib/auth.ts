import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) throw new Error("User not found")

        if (!user.isActive || user.isDeleted) {
          throw new Error("Account is inactive")
        }

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!valid) throw new Error("Invalid password")

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },

  jwt: {
    maxAge: 60 * 60 * 8,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.name = user.name ?? undefined
      }
      return token
    },

    async session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id
      }

      if (token.role === "ADMIN" || token.role === "STAFF") {
        session.user.role = token.role
      }

      if (typeof token.name === "string") {
        session.user.name = token.name
      }

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
