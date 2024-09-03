import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

// export function middleware(req) {
//     const token = req.headers.Auhthorization;
//     console.log("here==",req.headers);
//     if (!token) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
//     return NextResponse.next();
// }

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$|login|register|^$).*)',
    ],
}