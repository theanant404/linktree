import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/auth/v1/:path*',  '/', '/account/:path*'],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  // console.log(token);
  const url = req.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/auth/v1/sign-in') ||
      url.pathname.startsWith('/auth/v1/sign-up') ||
      url.pathname.startsWith('/auth/v1/verification'))
  ) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  if (!token && url.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/auth/v1/sign-in', req.url));
  }

  return NextResponse.next();
}