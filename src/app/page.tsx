import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, BatteryCharging, Zap, MapPin } from "lucide-react";
import { SOLUTIONS_DATA } from "@/lib/data";
import { getProducts } from "@/lib/woocommerce";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#050505] text-white pt-12 lg:pt-12 pb-16 lg:pb-24">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]" />

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
          
          {/* Text Content */}
          <div className="relative z-20 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#110804] text-orange-500 font-medium text-xs mb-6 border border-orange-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Next-Gen Tracking Technology
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="block text-white mb-1">Smarter Tracking.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                Total Control.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              Enterprise-grade GPS hardware powered by intelligent software. Experience real-time visibility, pinpoint accuracy, and unparalleled reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#1a1a1a] border border-white/5 hover:bg-[#222] transition-colors text-sm font-medium text-white shadow-[0_0_15px_rgba(234,88,12,0.1)]">
                Shop GPS Trackers <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/solutions" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] transition-colors text-sm font-medium text-white">
                Explore Solutions
              </Link>
            </div>
          </div>

          {/* Hero Visuals - 3D Render & Glassmorphism */}
          <div className="relative w-full flex items-center justify-end mt-12 lg:mt-0">
             
             {/* Main glowing device image */}
             <div className="relative w-[85%] sm:w-[75%] lg:w-[90%] max-w-[500px] aspect-square rounded-2xl overflow-hidden shadow-2xl">
               <Image
                 src="/images/hero-tracker.png"
                 alt="AURO GPS 3D Tracker"
                 fill
                 className="object-contain"
                 priority
               />
             </div>

             {/* Floating Data Pill 1 */}
             <div className="absolute top-[15%] left-[-5%] lg:left-[5%] z-20 bg-[#0a0a0a] border border-white/5 rounded-2xl p-3 shadow-2xl flex items-center gap-3 hidden sm:flex">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Status</p>
                  <p className="text-sm font-semibold text-white">Live Tracking Active</p>
                </div>
             </div>

             {/* Floating Data Pill 2 */}
             <div className="absolute bottom-[10%] right-[5%] z-20 bg-[#0a0a0a] border border-white/5 rounded-2xl p-3 shadow-2xl flex items-center gap-3 hidden sm:flex">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <span className="text-orange-500 font-bold text-[10px]">4G</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Connectivity</p>
                  <p className="text-sm font-semibold text-white">LTE Global Band</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Featured Products</h2>
              <p className="text-slate-500 max-w-2xl text-lg">
                Discover our most popular GPS tracking devices, engineered for precision and durability.
              </p>
            </div>
            <Link href="/shop" className={buttonVariants({ variant: "ghost", className: "text-orange-600 hover:text-orange-700 hover:bg-orange-50 hidden sm:flex" })}>
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group block">
                <div className="bg-slate-50 rounded-2xl p-6 mb-4 relative aspect-square overflow-hidden transition-all duration-300 group-hover:bg-slate-100">
                  {product.on_sale && (
                    <div className="absolute top-4 left-4 z-10 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {product.images[0] && (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400 mb-1">
                    {product.categories[0]?.name || 'GPS Tracker'}
                  </div>
                  <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">${parseFloat(product.price).toFixed(2)}</span>
                    {product.on_sale && product.regular_price && (
                      <span className="text-sm text-slate-400 line-through">
                        ${parseFloat(product.regular_price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop" className={buttonVariants({ variant: "outline", className: "w-full" })}>
               View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why AURO GPS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">Why Choose AURO GPS?</h2>
            <p className="text-lg text-slate-600">
              Built for reliability and precision. Our trackers deliver real-time data across wide network coverage, ensuring you never lose sight of your assets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Real-time Tracking", desc: "Pinpoint accuracy globally with rapid location updates." },
              { icon: BatteryCharging, title: "Long Battery Backup", desc: "Up to 10000mAh capacities for extended untethered use." },
              { icon: Zap, title: "Easy Installation", desc: "Strong magnetic mounts or simple wired integration." },
              { icon: ShieldCheck, title: "Rugged Design", desc: "Built to withstand harsh environments and weather." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-16 h-16 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Enterprise Solutions</h2>
              <p className="text-slate-500 max-w-2xl text-lg">
                Comprehensive tracking software designed for varied industry requirements.
              </p>
            </div>
            <Link href="/solutions" className={buttonVariants({ variant: "ghost", className: "text-orange-600 hover:text-orange-700 hover:bg-orange-50 hidden md:flex" })}>
              View All Solutions <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((solution, i) => (
              <Link key={solution.id} href={`/solutions/${solution.slug}`} className="group relative block overflow-hidden rounded-2xl bg-zinc-900 aspect-[4/3]">
                <Image
                  src={`/images/solutions/${solution.slug}.png`}
                  alt={solution.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent opacity-90" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{solution.title}</h3>
                    <p className="text-slate-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {solution.shortDescription}
                    </p>
                    <div className="inline-flex items-center text-orange-500 font-medium">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4G Tracker Highlight */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-orange-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative aspect-square bg-white/5 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
                <Image
                  src="/images/products/auro-4g-device.jpg"
                  alt="AURO 4G GPS Tracker wired device"
                  fill
                  className="object-contain p-8"
                />
             </div>
             <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-600/20 text-orange-400 font-bold tracking-wider text-sm mb-6 uppercase">
                  Featured Product
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">4G GPS TRACKER</h2>
                <p className="text-xl text-slate-300 mb-8 max-w-lg">
                  Smart tracking. Total control. High-speed 4G LTE connectivity ensuring uninterrupted real-time updates for fleet and personal vehicles.
                </p>
                
                <ul className="grid sm:grid-cols-2 gap-4 mb-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    4G LTE Connectivity
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    Remote Fuel Cut-off
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    One-way Voice Monitoring
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    9V–90V DC Support
                  </li>
                </ul>

                <Link href="/shop/auro-4g-gps-tracker" className={buttonVariants({ size: "lg", className: "bg-orange-600 hover:bg-orange-700 h-14 px-8 text-lg rounded-full" })}>
                  Shop 4G GPS Tracker
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Children / Students ID Card Highlight */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-zinc-900">Children / Students ID Card</h2>
                <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                  4G GPS tracker in an ID card format for children and students with real-time location tracking, SOS alerts and geofencing.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {['Real Time Tracking', 'Safety Alerts', 'SOS Button', 'Set Safe Zone', 'Two Way Voice Calling', 'Monitoring'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg text-slate-700 font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/shop/children-students-id-card" className={buttonVariants({ size: "lg", className: "bg-zinc-900 hover:bg-zinc-800 text-white h-14 px-8 text-lg rounded-full" })}>
                  View Product
                </Link>
             </div>
             
             <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/products/children-id-card.png"
                  alt="Children / Students ID Card Tracker"
                  fill
                  className="object-cover"
                />
             </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
