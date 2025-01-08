import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,

  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);


const isPublicRoutes=(url:string)=>{
  if(publicRoutes.includes(url)){
    return true
  }
  const dynamicRoutePatterns = [
    /^\/learn\/[a-zA-Z0-9_-]+$/, 
    /^\/course\/[a-zA-Z0-9_-]+$/,
];

return dynamicRoutePatterns.some((pattern) => pattern.test(url));
}

//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  
  

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = isPublicRoutes(nextUrl.pathname);
  const isAuthenticationRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isPublicRoute) return null;

  if (isAuthenticationRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};