// middleware
import { NextResponse, NextRequest } from 'next/server';
// const isloggedIn: boolean = true;
export function middleware(request: NextRequest) {
    // let cookie = request.cookies.get('my-cookie');
    // let header = new Headers(request.headers);
    // if (isloggedIn) {
    //     return NextResponse.next();
    // }
    return NextResponse.redirect(new URL('/', request.url));
}
export const config = {
    matcher: ['/profile'],
};
