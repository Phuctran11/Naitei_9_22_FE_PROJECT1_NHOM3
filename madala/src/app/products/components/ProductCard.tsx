'use client';
import React from 'react';
import { IProduct } from '@/models/Product';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import SafeImage from '@/app/products/components/SafeImage';
import StarRating from '@/app/products/components/StarRating';
import { useCompare } from '@/contexts/CompareContext';

interface ProductCardProps {
  product: IProduct;
  onAddToCompare?: (product: IProduct) => void;
  onAddToCart?: (product: IProduct) => void;
  onToggleFavorite?: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCompare, 
  onAddToCart, 
  onToggleFavorite 
}) => {
  const { isInCompare, addToCompare } = useCompare();
  const hasDiscount = product.salePrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const isProductInCompare = isInCompare(String(product._id));

  const handleProductClick = () => {
    addToCompare(product);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isProductInCompare ? 'ring-2 ring-[#8ba63a] ring-opacity-50' : ''
      }`}
    >
      <div 
        className="relative group/image cursor-pointer"
        onClick={handleProductClick}
      >
        <SafeImage
          src={product.images?.[0] || ''}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-300"
          fallbackClassName="w-full h-48 md:h-56"
        />
        
        {/* Phần discount */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{discountPercent}%
          </div>
        )}

        {/* Button "đã chọn" khi đã chọn so sánh */}
        {isProductInCompare && (
          <div className="absolute top-2 right-2 bg-[#8ba63a] text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
            ✓ Đã chọn
          </div>
        )}

        {/* Button "So sánh" khi hover vào image prod */}
        {!isProductInCompare && (
          <div className="absolute inset-0 bg-transparent transition-all duration-300 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover/image:opacity-100 transition-all duration-300 bg-white hover:bg-[#8ba63a] hover:text-white bg-opacity-95 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-lg pointer-events-auto cursor-pointer">
              So sánh
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
          {product.attributes?.brand || 'Brand'}
        </p>

        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>

        <div className="mb-2">
          <StarRating 
            rating={product.rating?.average || 0}
            size="xs"
            showValue={true}
            reviewCount={product.rating?.count || 0}
          />
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#8ba63a]">
              {product.salePrice.toLocaleString('vi-VN')}₫
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="flex-1 bg-[#8ba63a] hover:bg-[#7a942c] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1"
          >
            <FaShoppingCart className="text-xs" />
            MUA HÀNG
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product);
            }}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
