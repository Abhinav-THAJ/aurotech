import { NextResponse } from 'next/server';
import { api } from '@/lib/woocommerce';

function parseOrderTracking(order: any) {
  let detectedAwb = '';
  let detectedCourier = '';
  let detectedShipmentId = '';
  let detectedTrackingUrl = '';

  if (Array.isArray(order.meta_data)) {
    for (const meta of order.meta_data) {
      const key = (meta.key || '').toLowerCase();
      const val = meta.value;
      if (val === null || val === undefined || val === '') continue;

      const strVal = typeof val === 'object' ? '' : String(val).trim();

      // Check for AWB / Tracking number
      if (
        (key.includes('awb') || key.includes('tracking_number') || key === '_tracking_id' || key === 'tracking_code') &&
        strVal.length > 3
      ) {
        detectedAwb = strVal;
      }

      // Check for courier name
      if (
        (key.includes('courier') || key.includes('shipping_provider') || key.includes('tracking_provider')) &&
        strVal.length > 1
      ) {
        detectedCourier = strVal;
      }

      // Check for Shiprocket shipment ID
      if (key.includes('shipment_id') && strVal.length > 0) {
        detectedShipmentId = strVal;
      }

      // Check for WooCommerce shipment tracking plugin array
      if (key === '_wc_shipment_tracking_items' && Array.isArray(val) && val.length > 0) {
        const firstTrack = val[0];
        if (firstTrack.tracking_number) detectedAwb = String(firstTrack.tracking_number).trim();
        if (firstTrack.custom_tracking_provider || firstTrack.tracking_provider) {
          detectedCourier = String(firstTrack.custom_tracking_provider || firstTrack.tracking_provider).trim();
        }
        if (firstTrack.custom_tracking_link) {
          detectedTrackingUrl = String(firstTrack.custom_tracking_link).trim();
        }
      }
    }
  }

  if (detectedAwb && !detectedTrackingUrl) {
    detectedTrackingUrl = `https://shiprocket.co/tracking/${detectedAwb}`;
  }

  // Determine fulfillment stage
  const statusLower = (order.status || '').toLowerCase();
  let step = 1;
  let statusLabel = 'Order Placed';
  let statusDescription = 'Your order has been recorded in our system.';

  if (statusLower === 'processing') {
    step = 2;
    statusLabel = 'Processing & Packing';
    statusDescription = 'Order received and being prepared for courier pickup via Shiprocket.';
  } else if (statusLower === 'on-hold') {
    step = 1;
    statusLabel = 'On Hold';
    statusDescription = 'Payment is pending verification.';
  } else if (statusLower === 'completed') {
    step = 5;
    statusLabel = 'Delivered';
    statusDescription = 'Package has been successfully delivered.';
  } else if (statusLower === 'cancelled') {
    step = 0;
    statusLabel = 'Cancelled';
    statusDescription = 'This order was cancelled.';
  } else if (statusLower === 'refunded') {
    step = 0;
    statusLabel = 'Refunded';
    statusDescription = 'This order was refunded.';
  }

  // If AWB is generated, Shiprocket has dispatched it or scheduled pickup
  if (detectedAwb && step < 3 && statusLower !== 'completed') {
    step = 3;
    statusLabel = 'Dispatched / In Transit';
    statusDescription = `Handed over to ${detectedCourier || 'Shiprocket Courier'}. AWB: ${detectedAwb}`;
  }

  return {
    id: order.id,
    order_number: order.number || String(order.id),
    status: order.status,
    status_label: statusLabel,
    status_description: statusDescription,
    step,
    date_created: order.date_created,
    date_paid: order.date_paid,
    total: order.total,
    currency: order.currency || 'INR',
    awb: detectedAwb || null,
    courier: detectedCourier || (detectedAwb ? 'Shiprocket Partner' : null),
    shipment_id: detectedShipmentId || null,
    tracking_url: detectedTrackingUrl || null,
    billing: {
      name: `${order.billing?.first_name || ''} ${order.billing?.last_name || ''}`.trim(),
      city: order.billing?.city || '',
      state: order.billing?.state || '',
      postcode: order.billing?.postcode || '',
    },
    shipping: {
      name: `${order.shipping?.first_name || ''} ${order.shipping?.last_name || ''}`.trim(),
      address: `${order.shipping?.address_1 || ''} ${order.shipping?.address_2 || ''}`.trim(),
      city: order.shipping?.city || '',
      state: order.shipping?.state || '',
      postcode: order.shipping?.postcode || '',
      country: order.shipping?.country || 'IN',
    },
    items: (order.line_items || []).map((item: any) => ({
      id: item.id,
      name: item.name || 'GPS Tracking Device',
      quantity: item.quantity,
      total: item.total,
    })),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order_id') || searchParams.get('order');
  const awb = searchParams.get('awb');

  try {
    // 1. Tracking by Order ID
    if (orderId) {
      const cleanOrderId = orderId.replace(/[^0-9]/g, '');
      if (!cleanOrderId) {
        return NextResponse.json(
          { success: false, error: 'Invalid order number format' },
          { status: 400 }
        );
      }

      // Fetch order from WooCommerce
      const res = await api.get(`orders/${cleanOrderId}`);
      const order = res.data;

      if (!order || !order.id) {
        return NextResponse.json(
          { success: false, error: `Order #${cleanOrderId} not found.` },
          { status: 404 }
        );
      }

      const parsedOrder = parseOrderTracking(order);

      // If AWB wasn't found in metadata, check order notes
      if (!parsedOrder.awb) {
        try {
          const notesRes = await api.get(`orders/${cleanOrderId}/notes`);
          if (Array.isArray(notesRes.data)) {
            for (const n of notesRes.data) {
              const noteText = n.note || '';
              const match = noteText.match(/(?:AWB|tracking|awb code)[:\s#]+([A-Za-z0-9_-]+)/i);
              if (match && match[1]) {
                parsedOrder.awb = match[1];
                parsedOrder.tracking_url = `https://shiprocket.co/tracking/${match[1]}`;
                if (parsedOrder.step < 3) {
                  parsedOrder.step = 3;
                  parsedOrder.status_label = 'Dispatched / In Transit';
                  parsedOrder.status_description = `Shipment in transit. AWB: ${match[1]}`;
                }
                break;
              }
            }
          }
        } catch {
          // ignore notes fetch error
        }
      }

      return NextResponse.json({
        success: true,
        order: parsedOrder,
      });
    }

    // 2. Tracking by AWB code
    if (awb) {
      const cleanAwb = awb.trim();
      const trackingUrl = `https://shiprocket.co/tracking/${cleanAwb}`;

      return NextResponse.json({
        success: true,
        awb: cleanAwb,
        tracking_url: trackingUrl,
        courier: 'Shiprocket Delivery Partner',
        message: 'Live tracking available via Shiprocket portal.',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Please enter an Order ID or AWB Tracking number.' },
      { status: 400 }
    );
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || 'Error tracking order';
    console.error('Tracking API Error:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
