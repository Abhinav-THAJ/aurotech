import { NextResponse } from 'next/server';
import { api } from '@/lib/woocommerce';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer } = body;

    // Map cart items to WooCommerce line_items format
    const line_items = items.map((item: any) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    // Create WooCommerce order object
    const orderData = {
      payment_method: 'razorpay',
      payment_method_title: 'Razorpay (Card/UPI/NetBanking)',
      set_paid: false,
      billing: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        address_1: customer.address1,
        address_2: customer.address2,
        city: customer.city,
        state: customer.state,
        postcode: customer.postcode,
        country: customer.country,
        email: customer.email,
        phone: customer.phone,
      },
      shipping: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        address_1: customer.address1,
        address_2: customer.address2,
        city: customer.city,
        state: customer.state,
        postcode: customer.postcode,
        country: customer.country,
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '10.00',
        },
      ],
    };

    // Post order to WooCommerce
    const response = await api.post('orders', orderData);
    const wcOrder = response.data;

    // Create Razorpay Order
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const amountInPaise = Math.round(parseFloat(wcOrder.total) * 100);
    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: wcOrder.currency || 'INR',
      receipt: `receipt_wc_${wcOrder.id}`,
    });

    return NextResponse.json({ 
      success: true, 
      orderId: wcOrder.id,
      razorpayOrderId: rzpOrder.id,
      amount: amountInPaise,
      currency: wcOrder.currency || 'INR',
    });
  } catch (error: any) {
    console.error('Order Error:', error.response?.data || error.message);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
