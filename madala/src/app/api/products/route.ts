import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category'); // Ví dụ: "cat-1"

        const filter: any = {};

        if (category) {
            filter['category._id'] = category; // Trường hợp bạn lưu category là Object hoặc _id
            // hoặc nếu bạn dùng category là string: filter.category = category;
        }

        const products = await Product.find(filter);

        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
