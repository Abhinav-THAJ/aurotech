import React from 'react';
import Image from 'next/image';
import { ShieldCheck, MapPin, Target } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | AURO GPS',
  description: 'Smart Tracking. Total Control. Learn more about AURO GPS.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-950 text-white py-24 lg:py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-zinc-950" />
         <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">About AURO GPS</h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
               Advanced GPS Tracking Solutions for What Matters Most.
            </p>
         </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="prose prose-slate prose-lg lg:prose-xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Smart Tracking. Total Control.</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                 AURO GPS is a premium technology brand dedicated to providing state-of-the-art GPS tracking products and solutions. From high-capacity magnetic trackers designed for heavy machinery and logistics, to intelligent 4G wired trackers for fleet management, and compact personal trackers ensuring safety on the go.
              </p>
              <p className="text-slate-600 leading-relaxed">
                 Our mission is to deliver real-time visibility, unparalleled reliability, and complete peace of mind through advanced tracking technology.
              </p>
           </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                 <div className="w-20 h-20 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">Precision</h3>
                 <p className="text-slate-600">
                    High-accuracy positioning technology ensures you always know exactly where your assets are, globally.
                 </p>
              </div>
              <div>
                 <div className="w-20 h-20 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">Reliability</h3>
                 <p className="text-slate-600">
                    Built rugged to withstand tough environments. With long-lasting batteries and robust network coverage.
                 </p>
              </div>
              <div>
                 <div className="w-20 h-20 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">Coverage</h3>
                 <p className="text-slate-600">
                    Advanced 4G LTE connectivity for uninterrupted monitoring across cityscapes and remote areas alike.
                 </p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
