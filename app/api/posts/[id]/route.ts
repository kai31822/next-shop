import { NextRequest, NextResponse } from 'next/server';
const posts: any = [
    {
        id: 1,
        title: 'title1',
        description: 'description1',
    },
    { id: 2, title: 'title2', description: 'description2' },
];

export async function GET(request: NextRequest, context: any) {
    const { params } = context;
    return NextResponse.json({
        post: posts.find((x: any) => x.id.toString() === params.id),
    });
}
