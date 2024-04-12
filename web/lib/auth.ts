import {UpstashRedisAdapter} from "@auth/upstash-redis-adapter";
import Resend from "next-auth/providers/resend";
import {Redis} from "@upstash/redis";
import NextAuth from "next-auth";

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: UpstashRedisAdapter(redis),
    callbacks: {
        async session({session, user}) {
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