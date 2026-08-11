import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | AURO GPS',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout 
      title="Privacy Policy" 
      description="How we collect, use, and protect your personal information."
      lastUpdated="August 11, 2026"
    >
      <p>
        We respect your privacy and are committed to maintaining it. When you shop on our shopping store, we will ask you to input your information and will collect Personal Information from you such as your name, e-mail address, billing address, shipping address, telephone/ mobile number, product selections, credit card or other payment information and password.
      </p>
      <p>
        We recognize your right to confidentiality and are committed to protecting your privacy. We do not furnish any identifiable information at the individual level regarding its customers to any third party. The information you give to us is held with the utmost care and security. This information is collected primarily to ensure that we are able to fulfill your requirements and to deliver you a truly personalized shopping experience. When navigating our web site, personal information about you is not collected automatically or without your knowledge.
      </p>
      <p>
        We are also bound to co-operate fully should a situation arise where we are required by law or legal process to provide information about a customer. We may share non-personal, non-individual statistical or demographic information in aggregate form with our marketing partners, advertisers or other third-parties for research and advertising purposes. In other words, we will not tell our marketing partners that you purchased a specific product, but we may tell them how many customers purchased that product.
      </p>
      <p>
        If you consent, to notify you of products or special offers that may be of interest to you. You agree that you do not object to us contacting you for any of the above purposes whether by telephone, e-mail or in writing and you confirm that you do not and will not consider any of the above as being a breach of any of your rights under the Telecommunications (Data Protection and Privacy) Regulations 1999.
      </p>
      <p>
        We will not release your Personal Information to any company outside for mailing or marketing purposes.
      </p>
      <p>
        We always strive to respect the privacy of our customers completely. We use the information we collect on our website to enhance your overall shopping experience. We do not sell, trade, or rent your personal information to others.
      </p>
    </LegalPageLayout>
  );
}
