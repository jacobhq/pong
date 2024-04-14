/** @type {import('next').NextConfig} */
import { withAxiom } from "next-axiom";

const nextConfig = {
    experimental: {
        serverActions: {
            // https://github.com/vercel/next.js/issues/58019#issuecomment-1795133629, https://github.com/vercel/next.js/issues/58019#issuecomment-1811435392, https://github.com/vercel/next.js/issues/58019#issuecomment-1812717649
            // Thank you! :)
            allowedOrigins: ["localhost:3000", "3rh1hq76-3000.uks1.devtunnels.ms"],
        },

    }
};

export default withAxiom(nextConfig);
