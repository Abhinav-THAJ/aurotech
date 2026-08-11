import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | AURO GPS',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-slate prose-orange max-w-none">
          <p>
            At Aurogps, we believe in providing our customers with quality GPS tracking devices that meet their specific needs. However, we understand that there may be instances where our customers may need to return a product. That is why we have created a refund policy that is fair and transparent to all our customers.
          </p>

          <h2>General Refund Policy</h2>
          <p>
            If for any reason, you are not satisfied with your purchase, we offer a 30-day money-back guarantee on all our products. To qualify for a refund, the product must be returned to us within 30 days of the purchase date in its original packaging, with all accessories and manuals included. We reserve the right to refuse a refund if the product is returned damaged, incomplete or without the original packaging.
          </p>
          <p>
            Refunds will be issued in the same method of payment used to purchase the product. If the product was purchased using a credit or debit card, the refund will be credited back to the same card used for the purchase. Please allow 5-7 business days for the refund to appear on your statement.
          </p>

          <h2>Return Process</h2>
          <p>If you would like to return a product for a refund, please follow these steps:</p>
          <ul>
            <li>Contact our customer service team by phone or email within 30 days of the purchase date to initiate the return process. Our customer service team will provide you with a Return Merchandise Authorization (RMA) number and instructions on how to return the product.</li>
            <li>Pack the product securely in its original packaging, including all accessories and manuals.</li>
            <li>Write the RMA number on the outside of the package and ship it back to us using a traceable shipping method. The customer is responsible for the cost of shipping the product back to us.</li>
            <li>Once we receive the returned product, we will inspect it to ensure it meets our return policy requirements. If the product is deemed eligible for a refund, we will process the refund within 5-7 business days.</li>
          </ul>

          <h2>Exchanges</h2>
          <p>
            We do not offer exchanges for our products. If you would like to exchange a product for a different one, please return the original product for a refund and place a new order for the desired product.
          </p>

          <h2>Defective Products</h2>
          <p>
            If you receive a defective product, please contact our customer service team immediately to initiate a return. Defective products may be returned for a refund or replacement within 30 days of the purchase date. We will cover the cost of shipping for defective products returned to us.
          </p>
          <p>
            Refunds for defective products will be processed within 5-7 business days after the product has been received and inspected. If the product is found to be functioning properly, we reserve the right to deny the refund and return the product to you.
          </p>

          <h2>Damaged Products</h2>
          <p>
            If you receive a product that has been damaged during shipping, please contact our customer service team immediately. We will work with you to file a claim with the shipping carrier and arrange for a replacement product to be shipped to you.
          </p>

          <h2>Non-Returnable Products</h2>
          <p>Certain products may not be returned for a refund, including:</p>
          <ul>
            <li>Products that have been used or show signs of wear and tear</li>
            <li>Products that have been damaged due to misuse, abuse or neglect</li>
            <li>Products that have been modified or altered in any way</li>
          </ul>
          <p>
            We reserve the right to refuse a refund for any product that does not meet our return policy requirements.
          </p>

          <h2>Final Thoughts</h2>
          <p>
            At Aurogps, we stand behind the quality of our products and are committed to providing our customers with the best possible service. We believe our refund policy is fair and transparent and will work with our customers to ensure their satisfaction. If you have any questions or concerns regarding our refund policy, please do not hesitate to contact our customer service team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
