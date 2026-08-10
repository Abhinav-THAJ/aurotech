import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import { buttonVariants } from '@/components/ui/button';

export const metadata = {
  title: 'Shop All GPS Trackers | AURO GPS',
  description: 'Browse our complete catalog of premium GPS tracking solutions.',
};

// Revalidate every hour or as needed (0 for no cache during dev)
export const revalidate = 0;

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">Shop</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Discover our range of premium GPS trackers designed for reliability and accuracy.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-4 pb-2 border-b">Categories</h3>
            <ul className="space-y-3 text-slate-600">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="hover:text-orange-600 transition-colors">
                    {category.name} <span className="text-slate-400 text-sm ml-1"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <span className="text-slate-500">Showing {products.length} results</span>
            <select className="border border-slate-200 rounded-md py-2 px-4 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-orange-500">
              <option>Default sorting</option>
              <option>Sort by price: low to high</option>
              <option>Sort by price: high to low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <Link href={`/shop/${product.slug}`} className="relative bg-slate-50 aspect-square p-6 flex items-center justify-center">
                  {product.on_sale && (
                    <div className="absolute top-4 left-4 z-10 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-slate-400">No Image</div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                    {product.categories[0]?.name}
                  </div>
                  <Link href={`/shop/${product.slug}`} className="flex-1">
                    <h3 className="font-semibold text-lg leading-tight mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">${parseFloat(product.price).toFixed(2)}</span>
                      {product.on_sale && product.regular_price && (
                        <span className="text-sm text-slate-400 line-through">
                          ${parseFloat(product.regular_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Link href={`/shop/${product.slug}`} className={buttonVariants({ variant: "outline", size: "sm", className: "hidden group-hover:flex" })}>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
