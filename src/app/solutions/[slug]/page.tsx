import React from 'react';
import { notFound } from 'next/navigation';
import { SOLUTIONS_DATA } from '@/lib/data';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const solution = SOLUTIONS_DATA.find((s) => s.slug === resolvedParams.slug);
  
  if (!solution) {
    return { title: 'Solution Not Found' };
  }

  return {
    title: `${solution.title} | AURO GPS`,
    description: solution.shortDescription,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const solution = SOLUTIONS_DATA.find((s) => s.slug === resolvedParams.slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-950 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-zinc-950" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center text-sm text-slate-400 mb-8 font-medium">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/solutions" className="hover:text-orange-500 transition-colors">Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{solution.title}</span>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              {solution.title}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10">
              {solution.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className={buttonVariants({ size: "lg", className: "bg-orange-600 hover:bg-orange-700 h-14 px-8 text-lg rounded-full" })}>
                Get a Demo
              </Link>
              <Link href="/shop" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg rounded-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white" })}>
                Compatible Hardware <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">System Overview</h2>
              <div className="space-y-6">
                {solution.content.map((paragraph: string, idx: number) => {
                  const [strong, ...rest] = paragraph.split(':');
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-orange-500" />
                      </div>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {rest.length > 0 ? (
                          <>
                            <strong className="text-slate-900">{strong}:</strong>
                            {rest.join(':')}
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100">
              <h3 className="text-2xl font-bold mb-8 text-slate-900 tracking-tight">Core Features</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {solution.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="font-medium text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-orange-600 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to transform your operations?</h2>
          <p className="text-xl text-orange-100 mb-10 leading-relaxed">
            Contact our enterprise team today to discuss how {solution.title} can be customized for your specific requirements.
          </p>
          <Link href="/contact" className={buttonVariants({ size: "lg", className: "bg-white text-orange-600 hover:bg-orange-50 h-14 px-10 text-lg rounded-full font-bold" })}>
            Contact Sales Team
          </Link>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return SOLUTIONS_DATA.map((solution) => ({
    slug: solution.slug,
  }));
}
