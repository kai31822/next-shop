//for test
import { NextRequest, NextResponse } from 'next/server';
//Get
export async function GET() {
    return NextResponse.json({ hello: ' hello' });
}
//Post
export async function POST(request: NextRequest) {
    const data = await request.json();
    return NextResponse.json({ data });
}
//delete

//update
