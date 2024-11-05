import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server/index"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db) as any,
    secret: process.env.NEXTAUTH_SECRET,
    session: {strategy: "jwt"},
  providers: [
    Google({ 
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!}),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
    
  ],
})