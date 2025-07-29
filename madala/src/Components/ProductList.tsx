// src/components/ProductGrid.tsx
import Image from 'next/image';

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="font-semibold mt-2">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="font-bold mt-1">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
