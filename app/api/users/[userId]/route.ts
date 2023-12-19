//userId dynamic route
import { NextRequest, NextResponse } from 'next/server';
import Data from '@/app/api/users/data.json';

export async function GET(request: NextRequest, context: any) {
    const { params } = context;
    const user = Data.filter(x => params.userId === x.id.toString());

    return NextResponse.json({ user });
}
