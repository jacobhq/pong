import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Resend from "next-auth/providers/resend";
import NextAuth from "next-auth";
import { db } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({ session, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = user.id

            return session
        }
    },
    providers: [
        Resend({
            apiKey: process.env.RESEND_KEY as string,
            from: process.env.EMAIL_FROM as string,
        })
        // GithubProvider({
        //     // TODO: GITHUB APP
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // })
        // // ...add more providers here
    ]
})