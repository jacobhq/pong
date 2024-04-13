export { auth as middleware } from "@/lib/auth"

export const config = { matcher: ["/game/:path*", "/api/game/:path*"] }