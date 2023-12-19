//user route
import { NextResponse } from 'next/server';
import Data from '@/app/api/users/data.json';

export async function GET() {
    return NextResponse.json({ Data });
}
