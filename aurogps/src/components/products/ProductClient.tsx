'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { Minus, Plus, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm border border-slate-100/60 relative overflow-hidden">
      {/* Background soft gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Product Gallery */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square rounded-3xl bg-slate-50/80 border border-slate-100 overflow-hidden flex items-center justify-center shadow-inner">
            {product.on_sale && (
              <div className="absolute top-6 left-6 z-10 bg-orange-600 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-lg shadow-orange-600/20">
                SALE
              </div>
            )}
            {product.images[activeImage] ? (
              <Image
                src={product.images[activeImage].src}
                alt={product.images[activeImage].alt || product.name}
                fill
                className="object-contain p-12 transition-transform duration-700 hover:scale-105"
                priority
              />
            ) : (
              <div className="text-slate-400 font-medium">No Image Available</div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
              {product.images.map((img: any, idx: number) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeImage === idx 
                      ? 'ring-2 ring-orange-600 ring-offset-2 bg-slate-50' 
                      : 'border-2 border-slate-100 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `Thumbnail ${idx}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs mb-6 w-fit">
            {product.categories?.[0]?.name || 'Premium Tracker'}
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-xl font-medium text-slate-400 line-through">
                  ${parseFloat(product.regular_price).toFixed(2)}
                </span>
              )}
            </div>
            {product.stock_status === 'instock' ? (
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                In Stock & Ready to Ship
              </div>
            ) : (
              <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-red-200">Out of Stock</span>
            )}
          </div>

          <div 
            className="prose prose-lg prose-slate max-w-none mb-10 text-slate-600 leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* Attributes */}
          {product.attributes.length > 0 && (
            <div className="mb-10 space-y-6">
              {product.attributes.map((attr: any) => (
                <div key={attr.id} className="flex flex-col gap-3">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">{attr.name}</span>
                  <div className="flex flex-wrap gap-2">
                    {attr.options.map((opt: string, i: number) => (
                      <span key={i} className="px-5 py-2.5 rounded-xl border-2 border-orange-200/50 bg-orange-50/50 text-orange-900 font-semibold text-sm hover:border-orange-300 transition-colors cursor-default">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center border-2 border-slate-200 rounded-2xl bg-white h-16 shadow-sm">
              <button 
                className="w-16 h-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-5 h-5" />
              </button>
              <input 
                type="number" 
                className="w-14 text-center font-bold text-xl bg-transparent outline-none pointer-events-none text-slate-900" 
                value={quantity}
                readOnly
              />
              <button 
                className="w-16 h-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <Button 
              className="flex-1 h-16 text-lg font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-2xl gap-3 shadow-lg shadow-orange-600/20 transition-all hover:shadow-orange-600/40 hover:-translate-y-0.5"
              onClick={handleAddToCart}
              disabled={product.stock_status !== 'instock'}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-2 border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 hidden sm:flex transition-colors">
              <Heart className="w-6 h-6" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm">1 Year Warranty</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Fast Shipping</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm">7-Day Returns</span>
             </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="mt-24">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b-2 border-slate-100 bg-transparent rounded-none h-auto p-0 gap-10 mb-10 overflow-x-auto">
            <TabsTrigger value="description" className="text-xl font-bold rounded-none border-b-4 border-transparent data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 bg-transparent pb-4 data-[state=active]:bg-transparent px-0 data-[state=active]:shadow-none text-slate-400 hover:text-slate-600 transition-colors">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="text-xl font-bold rounded-none border-b-4 border-transparent data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 bg-transparent pb-4 data-[state=active]:bg-transparent px-0 data-[state=active]:shadow-none text-slate-400 hover:text-slate-600 transition-colors">
              Specifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="prose prose-lg prose-slate max-w-4xl text-slate-600">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </TabsContent>
          
          <TabsContent value="specifications">
            <div className="max-w-4xl bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <th className="py-5 px-8 font-bold text-slate-900 w-1/3 bg-slate-50/50">SKU</th>
                    <td className="py-5 px-8 text-slate-600 font-medium">{product.sku || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <th className="py-5 px-8 font-bold text-slate-900 w-1/3 bg-slate-50/50">Weight</th>
                    <td className="py-5 px-8 text-slate-600 font-medium">{product.weight ? `${product.weight} kg` : 'N/A'}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <th className="py-5 px-8 font-bold text-slate-900 w-1/3 bg-slate-50/50">Dimensions</th>
                    <td className="py-5 px-8 text-slate-600 font-medium">
                      {product.dimensions.length && product.dimensions.width && product.dimensions.height 
                        ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} cm` 
                        : 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
