'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Lock } from 'lucide-react';
import Script from 'next/script';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );
  
  const shipping = 10.00;
  const total = subtotal + (items.length > 0 ? shipping : 0);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const formData = new FormData(e.currentTarget);
    const customer = {
      email: formData.get('email'),
      phone: formData.get('phone'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      company: formData.get('company'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      state: formData.get('state'),
      postcode: formData.get('postcode'),
      country: formData.get('country'),
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer }),
      });

      const data = await response.json();
      
      if (data.success) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "AURO GPS",
          description: "Purchase",
          image: "/logo.png",
          order_id: data.razorpayOrderId,
          handler: async function (response: any) {
            // Payment successful, verify and update WooCommerce
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  woocommerce_order_id: data.orderId,
                }),
              });
              
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                clearCart();
                router.push(`/order-confirmation?order=${data.orderId}&payment_id=${response.razorpay_payment_id}`);
              } else {
                alert('Payment verification failed. Please contact support.');
                setIsProcessing(false);
              }
            } catch (err) {
              console.error('Verify error:', err);
              alert('An error occurred during payment verification.');
              setIsProcessing(false);
            }
          },
          prefill: {
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email,
            contact: customer.phone,
          },
          theme: {
            color: "#ea580c" // orange-600
          }
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
          alert('Payment failed: ' + response.error.description);
          setIsProcessing(false);
        });
        rzp1.open();
      } else {
        alert('Failed to place order. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [items.length, isProcessing, router]);

  if (items.length === 0 && !isProcessing) {
    return null;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 flex justify-between items-center text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-12">
              
              {/* Customer Info */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <Input name="email" required type="email" placeholder="you@example.com" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <Input name="phone" required type="tel" placeholder="+1 (555) 000-0000" className="h-12" />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <Input name="firstName" required placeholder="First name" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <Input name="lastName" required placeholder="Last name" className="h-12" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company (Optional)</label>
                    <Input name="company" placeholder="Company name" className="h-12" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                    <Input name="address1" required placeholder="Address Line 1" className="h-12 mb-4" />
                    <Input name="address2" placeholder="Apartment, suite, etc. (optional)" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                    <Input name="city" required placeholder="City" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">State / Province</label>
                    <Input name="state" required placeholder="State" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                    <Input name="postcode" required placeholder="ZIP / Postal code" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                    <select name="country" required className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Payment</h2>
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between cursor-pointer ring-2 ring-orange-500">
                  <div className="flex items-center gap-3">
                    <input type="radio" defaultChecked className="text-orange-600 focus:ring-orange-500 w-4 h-4" />
                    <span className="font-medium">Razorpay (Cards, UPI, NetBanking)</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-slate-200 rounded text-[8px] flex items-center justify-center font-bold">SECURE</div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  You will be securely redirected to Razorpay to complete your purchase after clicking "Pay".
                </p>
              </div>

            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 sticky top-32 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10">
                        {item.quantity}
                      </div>
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.images[0].alt}
                          fill
                          className="object-contain p-1"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2 leading-tight">{item.product.name}</h4>
                    </div>
                    <div className="font-medium text-sm">
                      ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-6 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-6 mb-8 flex justify-between items-end">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-orange-600">${total.toFixed(2)}</span>
              </div>
              
              <Button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-orange-600 hover:bg-orange-700 h-16 text-xl rounded-xl font-bold shadow-lg shadow-orange-600/20"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
