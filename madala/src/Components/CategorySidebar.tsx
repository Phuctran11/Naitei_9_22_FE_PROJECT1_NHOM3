"use client";
import React from "react";

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg mb-2">Danh mục</h3>
      {categories.map((category) => (
        <button
          key={category}
          className={`block w-full text-left px-4 py-2 rounded-lg transition ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySidebar;
