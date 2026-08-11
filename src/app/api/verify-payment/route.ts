import { NextResponse } from 'next/server';
import { api } from '@/lib/woocommerce';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      woocommerce_order_id 
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!secret) {
      return NextResponse.json({ success: false, error: 'Razorpay secret not configured' }, { status: 500 });
    }

    // Verify Razorpay signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Signature is valid, update WooCommerce order to 'processing' (paid)
      await api.put(`orders/${woocommerce_order_id}`, {
        status: 'processing',
        set_paid: true,
        transaction_id: razorpay_payment_id,
        payment_method: 'razorpay',
        payment_method_title: 'Razorpay (Card/UPI/NetBanking)',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Payment Verification Error:', error.response?.data || error.message);
    return NextResponse.json({ success: false, error: 'Failed to verify payment' }, { status: 500 });
  }
}
