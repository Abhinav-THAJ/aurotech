'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { CheckCircle, Truck, MapPin, ArrowRight } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || '';
  const paymentId = searchParams.get('payment_id') || '';
  const shipmentId = searchParams.get('shipment_id') || '';
  const awb = searchParams.get('awb') || '';

  const trackHref = orderNumber
    ? `/track-order?order=${orderNumber}`
    : awb
    ? `/track-order?awb=${awb}`
    : '/track-order';

  return (
    <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100 max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-lg text-slate-500 mb-2">Thank you for your purchase!</p>
        <p className="text-slate-600 mb-8 text-sm sm:text-base leading-relaxed">
          Your order{orderNumber && <> <strong className="text-slate-900">#{orderNumber}</strong></>} has been placed and confirmed. Order details have been sent to WooCommerce and synced with <strong>Shiprocket</strong> for packaging & courier dispatch.
        </p>

        {/* Order Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 text-left">
          <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2 text-sm sm:text-base">
            Order & Payment Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-slate-400 text-xs mb-1">Order Status</span>
              <span className="font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md text-xs uppercase tracking-wide">
                Processing (Paid)
              </span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs mb-1">Payment Method</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md text-xs uppercase tracking-wide">
                Paid via Razorpay
              </span>
            </div>
            {paymentId && (
              <div className="col-span-2 pt-2 border-t border-slate-100">
                <span className="block text-slate-400 text-xs mb-1">Razorpay Payment ID</span>
                <span className="font-mono text-xs text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 break-all block">
                  {paymentId}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Shiprocket Delivery Status Box */}
        <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100 mb-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Fulfillment via Shiprocket
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            Your shipment will be picked up by Shiprocket&apos;s courier partner. You will receive SMS & WhatsApp tracking updates as soon as the courier partner generates your AWB tracking code.
          </p>
          <Link
            href={trackHref}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <MapPin className="w-4 h-4" />
            Track Order Status in Real-Time →
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={trackHref}
            className={buttonVariants({
              size: 'lg',
              className: 'bg-orange-600 hover:bg-orange-700 h-13 px-8 text-base font-bold rounded-2xl shadow-md shadow-orange-600/20',
            })}
          >
            Track Order <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <Link
            href="/shop"
            className={buttonVariants({
              size: 'lg',
              variant: 'outline',
              className: 'h-13 px-8 text-base font-medium rounded-2xl border-slate-200',
            })}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
