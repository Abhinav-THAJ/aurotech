import React from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Order Confirmed | AURO GPS',
};

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const orderNumber = searchParams.order || '10452';

  return (
    <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center py-24 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 max-w-2xl w-full text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Order Confirmed</h1>
        <p className="text-xl text-slate-500 mb-2">
          Thank you for your purchase!
        </p>
        <p className="text-slate-600 mb-8">
          Your order number is <strong className="text-slate-900">#{orderNumber}</strong>. We'll send a confirmation email with your order details and tracking information once your package has shipped.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 text-left">
          <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Order Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-slate-500 mb-1">Status</span>
              <span className="font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Processing</span>
            </div>
            <div>
              <span className="block text-slate-500 mb-1">Payment Method</span>
              <span className="font-medium text-slate-900">Credit Card</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className={buttonVariants({ size: "lg", className: "bg-orange-600 hover:bg-orange-700 h-14 px-8 text-lg rounded-full" })}>Continue Shopping</Link>
          <Link href="/my-account" className={buttonVariants({ size: "lg", variant: "outline", className: "h-14 px-8 text-lg rounded-full" })}>View Account</Link>
        </div>
      </div>
    </div>
  );
}
