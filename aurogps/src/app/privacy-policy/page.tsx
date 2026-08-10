import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | AURO GPS',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate prose-orange max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <p>
            Welcome to AURO GPS. This Privacy Policy explains how [LEGAL COMPANY NAME] ("we", "us", or "our") collects, uses, and discloses your information when you use our website www.aurogps.com and our e-commerce services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul>
            <li>Create an account</li>
            <li>Place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact customer support</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, shipping address, billing address, and payment information.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process and fulfill your orders, including sending order confirmations and tracking details</li>
            <li>Manage your account and preferences</li>
            <li>Communicate with you about products, services, and promotions</li>
            <li>Protect against fraudulent transactions and improve website security</li>
          </ul>

          <h2>3. E-commerce and Payment Processing</h2>
          <p>
            Our store operates on WooCommerce. Your data is stored securely in our e-commerce databases. If you choose a direct payment gateway to complete your purchase, your payment data is processed by our payment processors and is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS).
          </p>

          <h2>4. Cookies and Tracking</h2>
          <p>
            We use cookies to maintain your shopping cart, save your preferences for future visits, and compile aggregate data about site traffic to improve our website experience.
          </p>

          <h2>5. Data Security and Retention</h2>
          <p>
            We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We retain your information for as long as your account is active or as needed to provide you services, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us (e.g., shipping carriers, payment gateways).
          </p>

          <h2>7. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you would like to exercise these rights, or if you have any questions about our privacy practices, please contact us.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> [PRIVACY CONTACT EMAIL]<br />
            <strong>Address:</strong> 75, Needarajappar Street, Pondicherry - 605001<br />
            <strong>Phone:</strong> +91 94988 18184
          </p>
        </div>
      </div>
    </div>
  );
}
