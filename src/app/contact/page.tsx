import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | AURO GPS',
  description: 'Get in touch with AURO GPS for sales and support.',
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Contact Us</h1>
          <p className="text-xl text-slate-500">
            Have a question about our GPS tracking solutions? Our team is here to help you find the perfect tracking system.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Headquarters</h4>
                    <p className="text-slate-500 text-sm">75, Needarajappar Street,<br />Pondicherry - 605001</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">WhatsApp / Phone</h4>
                    <p className="text-slate-500 text-sm">+91 94988 18184</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-500 text-sm">aurogpsindia@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
