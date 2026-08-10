import React from 'react';
import Link from 'next/link';
import { SOLUTIONS_DATA } from '@/lib/data';
import { ArrowRight, Server, Shield, Smartphone, Zap, Map, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Enterprise GPS Solutions | AURO GPS',
  description: 'Comprehensive tracking software designed for varied industry requirements, from fleet management to pet tracking.',
};

// Map icons to solutions
const iconMap: Record<string, React.ReactNode> = {
  'fleet-management': <Server className="w-8 h-8" />,
  'school-bus-tracking': <Shield className="w-8 h-8" />,
  'employee-transportation': <Map className="w-8 h-8" />,
  'field-employee-task-monitoring': <BarChart3 className="w-8 h-8" />,
  'pet-monitoring': <Zap className="w-8 h-8" />,
  'indoor-tracking': <Smartphone className="w-8 h-8" />,
};

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-zinc-950 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            GPS TRACKING <span className="text-orange-500">SOLUTIONS</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Advanced enterprise software platforms integrated with precision hardware to solve your most complex operational challenges.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-white relative -mt-8 rounded-t-[3rem] z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((solution) => (
              <div key={solution.id} className="group border border-slate-100 rounded-3xl p-8 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-100 transition-all">
                  {iconMap[solution.slug] || <Server className="w-8 h-8" />}
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{solution.title}</h2>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  {solution.shortDescription}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {solution.features.slice(0, 3).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {solution.features.length > 3 && (
                    <li className="text-sm text-slate-400 pl-4.5 italic">
                      + {solution.features.length - 3} more features
                    </li>
                  )}
                </ul>
                
                <Link 
                  href={`/solutions/${solution.slug}`}
                  className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-slate-50 text-slate-900 font-semibold group-hover:bg-orange-600 group-hover:text-white transition-colors"
                >
                  Explore Solution <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
