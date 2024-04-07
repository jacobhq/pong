import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {Redis} from '@upstash/redis'
import {UpstashRedisAdapter} from "@next-auth/upstash-redis-adapter"
import EmailProvider from "next-auth/providers/email"

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})


const handler = NextAuth({
    adapter: UpstashRedisAdapter(redis),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
        GithubProvider({
            // TODO: GITHUB APP
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
        // ...add more providers here
    ]
})

export {handler as GET, handler as POST}