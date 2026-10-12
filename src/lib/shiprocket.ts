/**
 * Shiprocket API Client
 * Handles authentication (token auto-refresh), order creation, and tracking.
 */

const SHIPROCKET_BASE = 'https://apiv2.shiprocket.in/v1/external';

// In-memory token cache (resets on server restart, good for serverless edge cache)
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function getShiprocketToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(`${SHIPROCKET_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Shiprocket auth failed: ${err}`);
  }

  const data = await res.json();
  cachedToken = data.token;
  // Token is valid for 24 hours; refresh 1 hour early
  tokenExpiry = now + 23 * 60 * 60 * 1000;
  return cachedToken as string;
}

export interface ShiprocketOrderPayload {
  wooOrderId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostcode: string;
  shippingCountry: string;
  items: Array<{
    name: string;
    sku: string;
    units: number;
    selling_price: number;
  }>;
  paymentMethod: string;
  totalAmount: number;
}

export async function createShiprocketOrder(payload: ShiprocketOrderPayload) {
  const token = await getShiprocketToken();

  const orderBody = {
    order_id: `WC-${payload.wooOrderId}`,
    order_date: new Date().toISOString().split('T')[0],
    pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
    channel_id: '',
    comment: 'Order from aurotech.in',
    billing_customer_name: payload.customerName,
    billing_last_name: '',
    billing_address: payload.shippingAddress,
    billing_address_2: '',
    billing_city: payload.shippingCity,
    billing_pincode: payload.shippingPostcode,
    billing_state: payload.shippingState,
    billing_country: payload.shippingCountry,
    billing_email: payload.customerEmail,
    billing_phone: payload.customerPhone,
    shipping_is_billing: true,
    order_items: payload.items.map((item) => ({
      name: item.name,
      sku: item.sku,
      units: item.units,
      selling_price: item.selling_price,
      discount: '',
      tax: '',
      hsn: '',
    })),
    payment_method: payload.paymentMethod,
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: payload.totalAmount,
    length: 15,
    breadth: 15,
    height: 10,
    weight: 0.5,
  };

  const res = await fetch(`${SHIPROCKET_BASE}/orders/create/adhoc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderBody),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Shiprocket order creation failed: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function trackShiprocketOrder(shipmentId: string | number) {
  const token = await getShiprocketToken();

  const res = await fetch(
    `${SHIPROCKET_BASE}/courier/track/shipment/${shipmentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Shiprocket tracking failed: ${err}`);
  }
  return await res.json();
}

export async function trackByAWB(awb: string) {
  const token = await getShiprocketToken();

  const res = await fetch(
    `${SHIPROCKET_BASE}/courier/track/awb/${awb}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Shiprocket AWB tracking failed: ${err}`);
  }
  return await res.json();
}
