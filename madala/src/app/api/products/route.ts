import { NextResponse } from 'next/server';
import connectToDB from '@/database/db';
import Product from '@/database/models/Product';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDB();
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}