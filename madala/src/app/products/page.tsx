'use client';
import React, { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import ProductList from '@/components/ProductList';
import Advertise from '@/components/Advertisement';
import CategorySidebar from '@/components/CategorySidebar';
import CompareBox from '@/components/CompareBox';
import TagList from '@/components/TagList';
import { IProduct } from '@/models/Product';

const ProductPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [compareItems, setCompareItems] = useState<IProduct[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string>('');

    // Extract unique categories and tags from products
    const categories = Array.from(new Set(products.flatMap(p => p.categoryIds || [])));
    const tags = Array.from(new Set(products.flatMap(p => p.tags || [])));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/products');
                
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on selected category and tag
    useEffect(() => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(product => 
                product.categoryIds?.includes(selectedCategory)
            );
        }

        if (selectedTag) {
            filtered = filtered.filter(product => 
                product.tags?.includes(selectedTag)
            );
        }

        setFilteredProducts(filtered);
    }, [products, selectedCategory, selectedTag]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(selectedCategory === category ? '' : category);
    };

    const handleTagSelect = (tag: string) => {
        setSelectedTag(selectedTag === tag ? '' : tag);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
            <aside className="col-span-1 space-y-4">
                <CategorySidebar 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                />
                <TagList 
                    tags={tags}
                    selectedTag={selectedTag}
                    onSelectTag={handleTagSelect}
                />
                <CompareBox items={compareItems} />
                <Advertise />
            </aside>

            <main className="col-span-1 lg:col-span-3">
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={() => setViewMode('grid')} 
                        className={`mr-2 px-4 py-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Grid
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        List
                    </button>
                </div>
                {viewMode === 'grid' ? (
                    <ProductGrid products={filteredProducts} />
                ) : (
                    <ProductList products={filteredProducts} />
                )}
            </main>
        </div>
    );
};

export default ProductPage;