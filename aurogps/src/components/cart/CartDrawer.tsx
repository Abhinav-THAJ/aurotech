'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, cartOpen, setCartOpen } = useCartStore();

  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length})</SheetTitle>
          <SheetDescription>
            Review your items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8 text-slate-300" />
              </div>
              <p>Your cart is empty.</p>
              <Link href="/shop" className={buttonVariants()} onClick={() => setCartOpen(false)}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 border-b pb-4">
                <div className="relative w-24 h-24 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0].src}
                      alt={item.product.images[0].alt || item.product.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2">{item.product.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">${parseFloat(item.product.price).toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)} className="h-8 w-8 text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-4 sm:flex-col border-t pt-6">
            <div className="flex justify-between items-center w-full mb-4">
              <span className="font-medium text-lg">Subtotal</span>
              <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Link href="/cart" className={buttonVariants({ variant: "outline", className: "w-full" })} onClick={() => setCartOpen(false)}>
                View Cart
              </Link>
              <Link href="/checkout" className={buttonVariants({ className: "w-full bg-orange-600 hover:bg-orange-700 text-white" })} onClick={() => setCartOpen(false)}>
                Checkout
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
