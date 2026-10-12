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
      woocommerce_order_id,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error('Razorpay secret is not configured in environment variables');
      return NextResponse.json(
        { success: false, error: 'Razorpay secret not configured' },
        { status: 500 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required Razorpay parameters' },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      console.error('Invalid Razorpay signature received');
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Signature is valid — update WooCommerce order to 'processing' (paid)
    // The WordPress Shiprocket plugin will automatically pick up this 'processing' order
    // and sync it with Shiprocket through the official WordPress-Shiprocket channel.
    await api.put(`orders/${woocommerce_order_id}`, {
      status: 'processing',
      set_paid: true,
      transaction_id: razorpay_payment_id,
      payment_method: 'razorpay',
      payment_method_title: 'Razorpay (Card/UPI/NetBanking)',
      customer_note: `Paid via Razorpay. Payment ID: ${razorpay_payment_id}, Order ID: ${razorpay_order_id}`,
    });

    return NextResponse.json({
      success: true,
      orderId: woocommerce_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message;
    console.error('Payment Verification Error:', errorDetails);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
