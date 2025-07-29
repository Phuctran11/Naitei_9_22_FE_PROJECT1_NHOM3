import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category'); //lấy tham số category từ URL
        const tags = searchParams.get('tags'); //lấy tham số tags từ URL

        let filter: any = {};

        if (category) {
            // Lọc tất cả category active
            const Category = (await import('@/models/Category')).default;
            const allCategories = await Category.find({ isActive: true });
            //Check result
            // console.log('All categories in database:', allCategories.map(c => ({
            //     _id: c._id?.toString(),
            //     categoryId: c.categoryId,
            //     name: c.name,
            //     level: c.level,
            //     parentId: c.parentId
            // })));

            // So sánh các loại Id trong mongodb 
            const selectedCategory = allCategories.find(cat => 
                cat._id?.toString() === category || 
                cat.categoryId === category ||
                cat.id === category
            );
            // Check category được chọn
            // console.log('Selected category:', selectedCategory);

            if (selectedCategory) {
                let categoryIds = [category];

                // Nếu category có level = 1 , lấy toàn bộ bao gồm cả subcategory
                if (selectedCategory.level === 1) {
                    const subcategories = allCategories.filter(cat => 
                        cat.level === 2 && cat.parentId === selectedCategory.categoryId
                    );
                    
                    // Add subcategory IDs (use categoryId field)
                    const subcategoryIds = subcategories.map(subcat => subcat.categoryId).filter(Boolean);
                    
                    categoryIds = [selectedCategory.categoryId, ...subcategoryIds];
                    // console.log(`Level 1 category ${selectedCategory.categoryId} includes subcategories:`, subcategoryIds); // check có subcategory không
                } else {
                    // For level 2 categories, use the categoryId
                    categoryIds = [selectedCategory.categoryId];
                }

                // Tạo filter cho mongodb
                filter.categoryIds = { $in: categoryIds };
                // console.log('Filtering products with category IDs:', categoryIds); check filter
            } else {
                // trường hợp category không tồn tại
                console.log('Category not found in database:', category);
                filter.categoryIds = { $in: ['non-existent-category'] };
            }
        }

        // Xử lý tag filter
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
            if (tagArray.length > 0) {
                filter.tags = { $in: tagArray };
                console.log('Filtering products with tags:', tagArray);
            }
        }

        // Tìm sản phẩm theo filter
        const products = await Product.find(filter).sort({ createdAt: -1 });

        console.log(`Products API: Found ${products.length} products for category: ${category || 'all'}, tags: ${tags || 'none'}`);

        return NextResponse.json(products);
    } catch (err) {
        console.error('Failed to fetch products:', err);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
