export { default } from "next-auth/middleware"

export const config = { matcher: ["/game/:path*", "/api/game/:path*"] }