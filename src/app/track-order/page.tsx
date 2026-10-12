'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  AlertCircle,
  ExternalLink,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  total: string;
}

interface OrderData {
  id: number;
  order_number: string;
  status: string;
  status_label: string;
  status_description: string;
  step: number;
  date_created: string;
  date_paid: string | null;
  total: string;
  currency: string;
  awb: string | null;
  courier: string | null;
  shipment_id: string | null;
  tracking_url: string | null;
  billing: {
    name: string;
    city: string;
    state: string;
    postcode: string;
  };
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  items: OrderItem[];
}

const STEPS = [
  { id: 1, label: 'Order Placed', desc: 'Order received & confirmed', icon: Package },
  { id: 2, label: 'Processing', desc: 'Preparing with Shiprocket', icon: Clock },
  { id: 3, label: 'Dispatched', desc: 'Handed to courier partner', icon: Truck },
  { id: 4, label: 'In Transit', desc: 'On the way to destination', icon: MapPin },
  { id: 5, label: 'Delivered', desc: 'Package delivered safely', icon: CheckCircle },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('order') || searchParams.get('awb') || '';

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<OrderData | null>(null);

  const fetchTracking = async (query: string) => {
    const clean = query.trim().replace(/^#/, '');
    if (!clean) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      // Determine if query looks like numeric order ID or AWB
      const isOrderId = /^\d+$/.test(clean) && clean.length <= 8;
      const param = isOrderId ? `order_id=${clean}` : `awb=${clean}`;

      const res = await fetch(`/api/track?${param}`);
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
      } else if (data.success && data.tracking_url) {
        // Direct AWB result
        window.open(data.tracking_url, '_blank');
      } else {
        setError(data.error || 'No tracking information found. Please check the order number.');
      }
    } catch {
      setError('Unable to fetch order status. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchTracking(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(searchInput);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <Truck className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Track Your Order
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            Enter your <strong>Order ID</strong> (e.g. 147) or <strong>AWB Tracking Number</strong> to view real-time shipping status and Shiprocket delivery updates.
          </p>
        </div>

        {/* Search Input Box */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm mb-10"
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Order ID or AWB Tracking Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. 147 or 1432549202"
                className="h-14 text-base pl-4 pr-10 rounded-2xl"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 h-14 px-8 text-base font-bold rounded-2xl shrink-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Track Order
                </span>
              )}
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Orders are synced automatically with Shiprocket for reliable delivery across India.
          </p>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 mb-10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold mb-1">Order Not Found</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Order Result Card */}
        {order && (
          <div className="space-y-6">
            {/* Status Overview Banner */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-900">
                      Order #{order.order_number}
                    </span>
                    <span className="bg-orange-50 text-orange-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Placed on {new Date(order.date_created).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Amount</p>
                  <p className="text-2xl font-black text-orange-600">
                    ₹{parseFloat(order.total).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-8">
                <div className="grid grid-cols-5 gap-2 relative">
                  {STEPS.map((step) => {
                    const Icon = step.icon;
                    const isDone = order.step >= step.id;
                    const isCurrent = order.step === step.id;

                    return (
                      <div key={step.id} className="flex flex-col items-center text-center">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                              : 'bg-slate-100 text-slate-400'
                          } ${isCurrent ? 'ring-4 ring-orange-100 scale-105' : ''}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <p
                          className={`text-xs font-bold mt-3 leading-tight ${
                            isDone ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5 leading-tight">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Status Message Box */}
              <div className="bg-orange-50/60 rounded-2xl p-5 border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">
                    {order.status_label}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {order.status_description}
                  </p>
                </div>

                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      className: 'bg-orange-600 hover:bg-orange-700 text-white shrink-0 rounded-xl gap-2 text-sm',
                    })}
                  >
                    Track on Shiprocket <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Courier & AWB Details (if available) */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-orange-600" />
                  Shipping Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="block text-xs text-slate-400">Courier Partner</span>
                    <span className="font-semibold text-slate-800">
                      {order.courier || 'Shiprocket (Assigning Courier)'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">AWB Tracking Number</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {order.awb ? order.awb : 'Will be assigned upon dispatch'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Delivery Destination</span>
                    <span className="text-slate-700">
                      {order.shipping.city}, {order.shipping.state} - {order.shipping.postcode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in Order */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-600" />
                  Order Items
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm py-2 border-b border-slate-50 last:border-0"
                    >
                      <div className="pr-4">
                        <p className="font-medium text-slate-800 line-clamp-1">{item.name || 'GPS Tracker'}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-slate-900 shrink-0">
                        ₹{parseFloat(item.total).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Back to Shopping */}
            <div className="text-center pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
