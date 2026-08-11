import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms and Conditions | AURO GPS',
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout 
      title="Terms and Conditions" 
      description="Read our terms and conditions before using our services."
      lastUpdated="August 11, 2026"
    >
      <p>
        Welcome to Aurogps, a provider of GPS tracking devices. These terms and conditions of use (“Terms”) govern your use of our services, software, and website, collectively referred to as our “Services”. Please read these Terms carefully before using our Services. By using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our Services.
      </p>

      <h2>1. Use of Services</h2>
      <p><strong>1.1 Eligibility.</strong> You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you are at least 18 years old.</p>
      <p><strong>1.2 License.</strong> We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services in accordance with these Terms.</p>
      <p><strong>1.3 Prohibited Use.</strong> You agree not to use our Services for any illegal, unauthorized, or prohibited purpose. You also agree not to use our Services to harass, abuse, or harm any person, or to interfere with or disrupt our Services or servers or networks connected to our Services.</p>
      <p><strong>1.4 Third-Party Products and Services.</strong> Our Services may include third-party products and services. We are not responsible for and do not endorse any third-party products or services.</p>

      <h2>2. GPS Tracking Devices</h2>
      <p><strong>2.1 Ownership.</strong> You agree that we own all GPS tracking devices sold to you until you have fully paid for them.</p>
      <p><strong>2.2 Warranty.</strong> We provide a one-year limited warranty for GPS tracking devices purchased from us. If a device is defective or malfunctioning, we will repair or replace it at no charge.</p>
      <p><strong>2.3 Disclaimer of Warranty.</strong> Except for the warranty provided in Section 2.2, we make no warranties, express or implied, with respect to GPS tracking devices sold by us. We specifically disclaim any implied warranties of merchantability or fitness for a particular purpose.</p>
      <p><strong>2.4 Limitation of Liability.</strong> Our liability for any damages arising from the use of GPS tracking devices sold by us is limited to the purchase price of the device.</p>

      <h2>3. Payment</h2>
      <p><strong>3.1 Payment Terms.</strong> All payments for GPS tracking devices must be made at the time of purchase. We accept payment by credit card or bank transfer.</p>
      <p><strong>3.2 Taxes.</strong> You are responsible for paying any applicable taxes associated with your purchase of GPS tracking devices.</p>

      <h2>4. Privacy</h2>
      <p><strong>4.1 Data Collection.</strong> We collect and use certain data, including personal data, in order to provide our Services to you. Our collection and use of data is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
      <p><strong>4.2 Use of Data.</strong> We may use data collected through our Services to improve our Services, to communicate with you, and for other lawful purposes.</p>
      <p><strong>4.3 Data Security.</strong> We take reasonable measures to protect the security of data collected through our Services. However, we cannot guarantee that our security measures will prevent unauthorized access or use of your data.</p>

      <h2>5. Termination</h2>
      <p><strong>5.1 Termination by Us.</strong> We may terminate these Terms and your use of our Services at any time, with or without cause, without notice.</p>
      <p><strong>5.2 Termination by You.</strong> You may terminate these Terms and your use of our Services at any time by ceasing to use our Services.</p>
      <p><strong>5.3 Effect of Termination.</strong> Upon termination of these Terms, your right to use our Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>

      <h2>6. Indemnification</h2>
      <p>You agree to indemnify and hold us harmless from any claims, damages, or expenses (including attorneys’ fees) arising out of or related to your use of our Services.</p>

      <h2>7. Governing Law and Dispute Resolution</h2>
      <p><strong>7.1 Governing Law.</strong> These Terms shall be governed by and construed in accordance with the laws of [insert governing law and jurisdiction].</p>
      <p><strong>7.2 Dispute Resolution.</strong> Any dispute arising out of or related to these Terms or your use of our Services shall be resolved through binding arbitration in accordance with the rules of the [insert arbitration organization]. The arbitration shall be conducted in [insert city and state] and shall be conducted in English. The award of the arbitrator shall be final and binding on the parties and may be entered and enforced in any court of competent jurisdiction.</p>

      <h2>8. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR FOR ANY DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF OUR SERVICES SHALL BE LIMITED TO THE AMOUNT YOU PAID US FOR GPS TRACKING DEVICES IN THE SIX MONTHS PRIOR TO THE CLAIM.
      </p>

      <h2>9. Miscellaneous</h2>
      <p><strong>9.1 Entire Agreement.</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and us with respect to your use of our Services.</p>
      <p><strong>9.2 Modification.</strong> We may modify these Terms from time to time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website. Your continued use of our Services following the posting of the modified Terms constitutes your acceptance of the modified Terms.</p>
      <p><strong>9.3 Assignment.</strong> You may not assign these Terms or any of your rights or obligations under these Terms without our prior written consent. We may assign these Terms or any of our rights or obligations under these Terms at any time without notice or your consent.</p>
      <p><strong>9.4 Waiver.</strong> Our failure to enforce any provision of these Terms shall not be deemed a waiver of such provision or any other provision of these Terms.</p>
      <p><strong>9.5 Severability.</strong> If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions of these Terms shall remain in full force and effect.</p>
      <p><strong>9.6 Headings.</strong> The headings in these Terms are for convenience only and shall not affect the interpretation of these Terms.</p>

      <p>
        By using our Services, you agree to these Terms. If you do not agree to these Terms, do not use our Services.
      </p>
    </LegalPageLayout>
  );
}
