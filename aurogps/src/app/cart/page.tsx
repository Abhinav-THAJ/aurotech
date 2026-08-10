'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { Button, buttonVariants } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-slate-300" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our premium GPS trackers to get started.
        </p>
        <Link href="/shop" className={buttonVariants({ size: "lg", className: "bg-orange-600 hover:bg-orange-700 h-14 px-8 text-lg rounded-full" })}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <h1 className="text-4xl font-bold mb-12 tracking-tight">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-slate-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>
          
          {items.map((item) => (
            <div key={item.product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-6 border-b">
              {/* Product Info */}
              <div className="col-span-1 sm:col-span-6 flex gap-6 items-center">
                <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0].src}
                      alt={item.product.images[0].alt || item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>
                  )}
                </div>
                <div>
                  <Link href={`/shop/${item.product.slug}`} className="font-semibold text-lg hover:text-orange-600 transition-colors line-clamp-2 mb-1">
                    {item.product.name}
                  </Link>
                  <p className="text-slate-500 font-medium">${parseFloat(item.product.price).toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-1 sm:col-span-3 flex sm:justify-center">
                <div className="flex items-center border border-slate-200 rounded-lg h-12 w-32">
                  <button 
                    className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    className="w-10 text-center font-semibold text-slate-900 bg-transparent outline-none pointer-events-none" 
                    value={item.quantity}
                    readOnly
                  />
                  <button 
                    className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="col-span-1 sm:col-span-2 text-right">
                <span className="font-bold text-lg hidden sm:block">
                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
                <span className="font-bold text-lg sm:hidden">
                  Total: ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Remove */}
              <div className="col-span-1 sm:col-span-1 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 sticky top-32">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6 mb-8 flex justify-between items-end">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-3xl font-bold text-orange-600">${subtotal.toFixed(2)}</span>
            </div>
            
            <Link href="/checkout" className={buttonVariants({ className: "w-full bg-orange-600 hover:bg-orange-700 h-14 text-lg rounded-xl mb-4" })}>
              Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <p className="text-center text-sm text-slate-500">
              Secure checkout. SSL encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
