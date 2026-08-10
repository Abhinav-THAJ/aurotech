import { NextResponse } from 'next/server';
import { api } from '@/lib/woocommerce';

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
      payment_method: 'bacs', // Defaulting to bank transfer / manual for now
      payment_method_title: 'Direct Bank Transfer',
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

    return NextResponse.json({ success: true, orderId: response.data.id });
  } catch (error: any) {
    console.error('WooCommerce Order Error:', error.response?.data || error.message);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
