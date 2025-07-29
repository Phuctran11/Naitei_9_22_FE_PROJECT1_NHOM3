"use client";
import React from "react";
import { Product } from "@/types";

interface CompareBoxProps {
  items: Product[];
}

const CompareBox: React.FC<CompareBoxProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl p-4 rounded-xl z-50 w-80">
      <h4 className="font-semibold mb-2 text-gray-800">So sánh sản phẩm</h4>
      <ul className="divide-y">
        {items.map((product) => (
          <li key={product.id} className="py-2 text-sm">
            <strong>{product.name}</strong>: ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareBox;

