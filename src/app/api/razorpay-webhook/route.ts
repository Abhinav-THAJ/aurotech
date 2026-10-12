import { NextResponse } from 'next/server';
import { api } from '@/lib/woocommerce';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ error: 'Missing webhook configuration' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('Invalid Razorpay webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // Handle payment.captured or order.paid
    if (event === 'payment.captured' || event === 'order.paid') {
      const payment = payload.payload?.payment?.entity;
      const order = payload.payload?.order?.entity;
      
      const receipt = order?.receipt || payment?.notes?.receipt || '';
      // Receipt format: receipt_wc_{order_id}
      let wcOrderId = null;
      if (receipt.startsWith('receipt_wc_')) {
        wcOrderId = receipt.replace('receipt_wc_', '');
      } else if (payment?.notes?.woocommerce_order_id) {
        wcOrderId = payment.notes.woocommerce_order_id;
      }

      if (wcOrderId) {
        console.log(`[Webhook] Marking WooCommerce order #${wcOrderId} as processing`);
        await api.put(`orders/${wcOrderId}`, {
          status: 'processing',
          set_paid: true,
          transaction_id: payment?.id,
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay (Card/UPI/NetBanking)',
          customer_note: `Paid via Razorpay (Webhook Verified). Payment ID: ${payment?.id}, Order ID: ${order?.id}`,
        });
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Razorpay Webhook Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
