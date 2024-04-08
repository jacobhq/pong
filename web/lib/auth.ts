import {UpstashRedisAdapter} from "@next-auth/upstash-redis-adapter";
import EmailProvider from "next-auth/providers/email";
import {Redis} from "@upstash/redis";

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: UpstashRedisAdapter(redis),
    callbacks: {
        // @ts-expect-error
        async session({session, user}) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = user.id

            return session
        }
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
        // GithubProvider({
        //     // TODO: GITHUB APP
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // })
        // // ...add more providers here
    ]
}