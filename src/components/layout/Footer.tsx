import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-slate-300 py-16 border-t border-zinc-900">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand / Contact */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <div className="relative w-40 h-12">
              <Image 
                src="/logo.png" 
                alt="AURO GPS" 
                fill 
                className="object-contain" 
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
            Advanced GPS Tracking Solutions for What Matters Most. Smart tracking. Total control.
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p><strong>Phone:</strong> +91 94988 18184</p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:aurogpsindia@gmail.com" className="hover:text-white transition-colors">
                aurogpsindia@gmail.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href="http://www.aurogps.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                www.aurogps.com
              </a>
            </p>
            <p><strong>Address:</strong> 75, Needarajappar Street, Pondicherry - 605001</p>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-6">
          <h4 className="text-white font-semibold tracking-wide">Products</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/category/magnetic-gps-trackers" className="hover:text-orange-500 transition-colors">
                Magnetic GPS Trackers
              </Link>
            </li>
            <li>
              <Link href="/category/4g-gps-trackers" className="hover:text-orange-500 transition-colors">
                4G GPS Trackers
              </Link>
            </li>
            <li>
              <Link href="/category/personal-gps-trackers" className="hover:text-orange-500 transition-colors">
                Personal GPS Trackers
              </Link>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div className="space-y-6">
          <h4 className="text-white font-semibold tracking-wide">Solutions</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/solutions/fleet-management" className="hover:text-orange-500 transition-colors">
                Fleet Management
              </Link>
            </li>
            <li>
              <Link href="/solutions/school-bus-tracking" className="hover:text-orange-500 transition-colors">
                School Bus Tracking
              </Link>
            </li>
            <li>
              <Link href="/solutions/employee-transportation" className="hover:text-orange-500 transition-colors">
                Employee Transportation
              </Link>
            </li>
            <li>
              <Link href="/solutions/field-employee-task-monitoring" className="hover:text-orange-500 transition-colors">
                Field Employee Task Monitoring
              </Link>
            </li>
            <li>
              <Link href="/solutions/pet-monitoring" className="hover:text-orange-500 transition-colors">
                Pet Monitoring
              </Link>
            </li>
            <li>
              <Link href="/solutions/indoor-tracking" className="hover:text-orange-500 transition-colors">
                Indoor Tracking
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer & Legal */}
        <div className="space-y-6">
          <h4 className="text-white font-semibold tracking-wide">Customer</h4>
          <ul className="space-y-3 text-sm mb-8">
            <li>
              <Link href="/my-account" className="hover:text-orange-500 transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-orange-500 transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-orange-500 transition-colors">
                Checkout
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          <h4 className="text-white font-semibold tracking-wide">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-zinc-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} AURO GPS. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Premium GPS Tracking Solutions.</p>
      </div>
    </footer>
  );
}
