'use client';
import React, { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import ProductList from '@/components/ProductList';
import Advertise from '@/components/Advertise';
import CategorySidebar from '@/components/CategorySidebar';
import CompareBox from '@/components/CompareBox';
import TagList from '@/components/TagList';
import { IProduct } from '@/database/models/Product';

const ProductPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
            <aside className="col-span-1 space-y-4">
                <CategorySidebar />
                <TagList />
                <CompareBox />
                <Advertise />
            </aside>

            <main className="col-span-1 lg:col-span-3">
                <div className="flex justify-end mb-4">
                    <button onClick={() => setViewMode('grid')} className="mr-2">Grid</button>
                    <button onClick={() => setViewMode('list')}>List</button>
                </div>
                {viewMode === 'grid' ? (
                    <ProductGrid products={products} />
                ) : (
                    <ProductList products={products} />
                )}
            </main>
        </div>
    );
};

export default ProductPage;