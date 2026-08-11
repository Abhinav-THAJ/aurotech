import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Shipping Policy | AURO GPS',
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout 
      title="Shipping Policy" 
      description="Learn about our shipping options, processing times, and delivery policies."
      lastUpdated="August 11, 2026"
    >
      <p>
        At Aurogps, we understand that getting your GPS tracking devices to you in a timely and efficient manner is crucial for your business. That’s why we have a comprehensive shipping policy in place to ensure that your order is processed and shipped as quickly as possible.
      </p>

      <h2>Order Processing Time</h2>
      <p>
        Orders placed before 3 PM EST will be processed the same day. Any orders placed after 3 PM EST will be processed the next business day. We will make every effort to process orders as quickly as possible, but please note that during peak periods or if a product is out of stock, processing times may be longer.
      </p>

      <h2>Shipping Time and Options</h2>
      <p>
        We offer several shipping options to choose from, depending on your location and the urgency of your order. Our standard shipping option is FedEx ground, which typically takes between 3-5 business days for delivery within the continental US. Expedited shipping options are also available, including 2-day and overnight delivery. Please note that shipping times may vary depending on your location, and additional fees may apply for expedited shipping.
      </p>

      <h2>International Shipping</h2>
      <p>
        We currently offer international shipping to select countries. If you are located outside of the United States and would like to place an order, please contact our customer service team for assistance. Please note that international orders may be subject to customs fees and taxes, which are the responsibility of the customer.
      </p>

      <h2>Shipping Rates</h2>
      <p>
        Shipping rates are calculated based on the weight and dimensions of the package, as well as the shipping destination. You can view shipping rates for your order during the checkout process. We do our best to offer competitive shipping rates, and we are constantly evaluating our shipping options to provide the best possible value to our customers.
      </p>

      <h2>Order Tracking</h2>
      <p>
        Once your order has been processed and shipped, you will receive a confirmation email with tracking information. You can use this information to track your package online and receive real-time updates on its status. If you have any questions or concerns about the status of your order, please contact our customer service team for assistance.
      </p>

      <h2>Delivery Issues</h2>
      <p>
        If your package is lost or damaged during shipping, please contact us immediately so that we can resolve the issue as quickly as possible. We will work with the shipping carrier to file a claim and arrange for a replacement order to be shipped to you. If your package is marked as delivered but you have not received it, please contact the shipping carrier first to inquire about the package’s whereabouts. If you are still unable to locate the package, please contact us for further assistance.
      </p>

      <h2>Order Cancellation and Changes</h2>
      <p>
        If you need to cancel or make changes to your order, please contact us as soon as possible. We will make every effort to accommodate your request, but please note that orders that have already been processed and shipped may not be able to be cancelled or modified.
      </p>

      <p>
        In conclusion, at Aurogps, we take our shipping policy seriously and strive to provide our customers with the best possible shipping experience. We are constantly evaluating our shipping options to provide the most efficient and cost-effective shipping solutions. If you have any questions or concerns about our shipping policy, please do not hesitate to contact us.
      </p>
    </LegalPageLayout>
  );
}
