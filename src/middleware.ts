import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const secret = process.env.JWT_SECRET
    const pathname = req.nextUrl.pathname
    console.log("pathname:", pathname)
    console.log("token:", req.nextauth.token)

    // Manage route protection
    const isAuth = await getToken({ req, secret, raw: true })
    const isLoginPage = pathname.startsWith("/login")

    const sensitiveRoutes = ["/dashboard"]
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isLoginPage) {
      console.log("isLoginPage", isLoginPage)
      console.log("req.url", req.url)
      console.log("isAuth", isAuth)
      console.log(new URL("/dashboard", req.url).toString())
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return NextResponse.next()
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}
