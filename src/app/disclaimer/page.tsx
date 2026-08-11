import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Disclaimer | AURO GPS',
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout 
      title="Disclaimer" 
      description="Important information regarding the limitations and risks of our GPS devices."
      lastUpdated="August 11, 2026"
    >
      <h2>Introduction</h2>
      <p>
        Aurogps is a company that sells GPS tracking devices. These devices are designed to help customers track the location of vehicles, assets, and people. However, before purchasing any GPS tracking device, it is important to understand the limitations and risks associated with using these devices. This disclaimer is intended to inform potential customers of the limitations and risks associated with the use of GPS tracking devices.
      </p>

      <h2>Limitations of GPS Tracking Devices</h2>
      <p>
        GPS tracking devices rely on a network of satellites to provide location data. While this technology is generally reliable, there are limitations to its accuracy. GPS signals can be disrupted by physical barriers such as buildings, trees, and mountains. This can result in inaccurate location data or a complete loss of signal. Additionally, GPS signals can be blocked or jammed intentionally, which can result in a loss of location data.
      </p>
      <p>
        Furthermore, GPS tracking devices rely on batteries or a power source to function. If the battery dies or the power source is interrupted, the device will stop working. This means that the device may not be able to provide location data when it is most needed.
      </p>

      <h2>Risk Associated with GPS Tracking Devices</h2>
      <p>
        GPS tracking devices are often used to track the location of vehicles, assets, and people. However, this type of monitoring can raise privacy concerns. It is important to note that the use of GPS tracking devices may be subject to local, state, or federal laws, and it is the customer’s responsibility to ensure compliance with these laws.
      </p>
      <p>
        In addition to legal considerations, there are ethical concerns surrounding the use of GPS tracking devices. The use of these devices to monitor the location of individuals without their knowledge or consent can be seen as an invasion of privacy. Customers should carefully consider the ethical implications of using GPS tracking devices before making a purchase.
      </p>
      <p>
        Aurogps makes no guarantees regarding the accuracy or reliability of its GPS tracking devices. Customers use these devices at their own risk and Aurogps is not liable for any damages that may occur as a result of using these devices.
      </p>

      <h2>Use of Information</h2>
      <p>
        GPS tracking devices collect and transmit location data to a server. This information can be accessed by the customer through a web portal or mobile application. Aurogps takes customer privacy seriously and is committed to protecting personal information. However, the company cannot guarantee the security of this information. Customers should take appropriate measures to secure their accounts and ensure that unauthorized parties cannot access location data.
      </p>
      <p>
        Aurogps is not responsible for any unauthorized access to customer accounts or location data. Customers are responsible for ensuring the security of their accounts and for any actions taken with their accounts.
      </p>

      <h2>Conclusion</h2>
      <p>
        GPS tracking devices can be a useful tool for tracking the location of vehicles, assets, and people. However, it is important to understand the limitations and risks associated with using these devices. Customers should carefully consider the ethical implications of using GPS tracking devices before making a purchase.
      </p>
      <p>
        Aurogps makes no guarantees regarding the accuracy or reliability of its GPS tracking devices. Customers use these devices at their own risk and Aurogps is not liable for any damages that may occur as a result of using these devices. Customers are responsible for ensuring the security of their accounts and for any actions taken with their accounts.
      </p>
      <p>
        This disclaimer is intended to inform potential customers of the limitations and risks associated with the use of GPS tracking devices. If you have any questions or concerns about the use of GPS tracking devices, please consult a licensed attorney in your jurisdiction.
      </p>
    </LegalPageLayout>
  );
}
