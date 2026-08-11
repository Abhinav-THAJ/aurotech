'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, User, Menu, ChevronDown, Shield, Map, BarChart3, Zap, Server, Smartphone, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SOLUTIONS_DATA } from '@/lib/data';
import { Category, Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CartDrawer } from '../cart/CartDrawer';

const solutionIconMap: Record<string, React.ReactNode> = {
  'fleet-management': <Server className="w-4 h-4" />,
  'school-bus-tracking': <Shield className="w-4 h-4" />,
  'employee-transportation': <Map className="w-4 h-4" />,
  'field-employee-task-monitoring': <BarChart3 className="w-4 h-4" />,
  'pet-monitoring': <Zap className="w-4 h-4" />,
  'indoor-tracking': <Smartphone className="w-4 h-4" />,
};

export function Header({ categories = [], products = [] }: { categories?: Category[], products?: Product[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm'
          : 'bg-white border-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-20 md:h-28 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-10">
          <div className="relative w-[200px] h-[64px] md:w-[270px] md:h-[85px]">
            <Image 
              src="/logo.png" 
              alt="AURO GPS" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {/* Home */}
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-orange-600 rounded-md hover:bg-slate-50 transition-colors"
            >
              Home
            </Link>

            {/* Products Mega Menu */}
            <div ref={productsRef} className="relative">
              <button
                onClick={() => { setProductsOpen(!productsOpen); setSolutionsOpen(false); }}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  productsOpen ? 'text-orange-600 bg-orange-50' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                )}
              >
                Products
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', productsOpen && 'rotate-180')} />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-2 w-[860px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="grid grid-cols-[220px_1fr] min-h-[340px]">
                    {/* Left panel — featured */}
                    <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Products</p>
                        <h3 className="text-white font-bold text-xl leading-snug mb-2">Smart GPS Tracking</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Premium tracking devices for every need — vehicle, asset or personal.</p>
                      </div>
                      <Link
                        href="/shop"
                        onClick={() => setProductsOpen(false)}
                        className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        Shop All Products <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Right panel — categories with products */}
                    <div className="p-6 columns-1 sm:columns-2 lg:columns-3 gap-6 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-200">
                      {categories.filter((cat) => {
                        const categoryProducts = products.filter(p => p.categories.some(c => c.slug === cat.slug));
                        return categoryProducts.length > 0;
                      }).map((category) => {
                        const categoryProducts = products.filter(p =>
                          p.categories.some(c => c.slug === category.slug)
                        );
                        const displayedProducts = categoryProducts.slice(0, 4);
                        return (
                          <div key={category.id} className="mb-8 break-inside-avoid">
                            <Link
                              href={`/category/${category.slug}`}
                              onClick={() => setProductsOpen(false)}
                              className="block text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-orange-500 pb-2 border-b border-slate-100 transition-colors mb-3"
                            >
                              {category.name}
                            </Link>
                            <div className="space-y-1">
                              {displayedProducts.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/shop/${product.slug}`}
                                  onClick={() => setProductsOpen(false)}
                                  className="group flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                  {/* Product thumbnail */}
                                  {product.images[0] && (
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-slate-200 shadow-sm">
                                      <Image
                                        src={product.images[0].src}
                                        alt={product.images[0].alt || product.name}
                                        fill
                                        className="object-contain p-1"
                                      />
                                    </div>
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-orange-600 transition-colors">
                                      {product.name}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                      ${parseFloat(product.price).toFixed(2)}
                                      {product.regular_price && product.on_sale && (
                                        <span className="line-through text-slate-400 ml-1 font-normal text-[10px]">
                                          ${parseFloat(product.regular_price).toFixed(2)}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                              {categoryProducts.length > 4 && (
                                <Link
                                  href={`/category/${category.slug}`}
                                  onClick={() => setProductsOpen(false)}
                                  className="block text-xs font-medium text-slate-500 hover:text-orange-600 pt-2 pl-2"
                                >
                                  + {categoryProducts.length - 4} more
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div ref={solutionsRef} className="relative">
              <button
                onClick={() => { setSolutionsOpen(!solutionsOpen); setProductsOpen(false); }}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  solutionsOpen ? 'text-orange-600 bg-orange-50' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                )}
              >
                Solutions
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', solutionsOpen && 'rotate-180')} />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-[560px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="grid grid-cols-[180px_1fr]">
                    {/* Left panel */}
                    <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 p-5 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Solutions</p>
                        <h3 className="text-white font-bold text-lg leading-snug mb-2">Enterprise GPS Software</h3>
                        <p className="text-zinc-400 text-xs leading-relaxed">Platforms built for every industry requirement.</p>
                      </div>
                      <Link
                        href="/solutions"
                        onClick={() => setSolutionsOpen(false)}
                        className="inline-flex items-center gap-2 mt-6 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        All Solutions <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Right: solutions grid */}
                    <div className="p-4 grid grid-cols-2 gap-1">
                      {SOLUTIONS_DATA.map((solution) => (
                        <Link
                          key={solution.id}
                          href={`/solutions/${solution.slug}`}
                          onClick={() => setSolutionsOpen(false)}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors"
                        >
                          <span className="mt-0.5 text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                            {solutionIconMap[solution.id] || <Server className="w-4 h-4" />}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-600 transition-colors leading-snug">
                              {solution.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                              {solution.shortDescription}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-orange-600 rounded-md hover:bg-slate-50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-orange-600 rounded-md hover:bg-slate-50 transition-colors"
            >
              Contact
            </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 z-10">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>

          {/* Mobile sheet */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-orange-600">Home</Link>
                <div>
                  <p className="text-lg font-medium text-slate-900 mb-2">Products</p>
                  <Link href="/shop" className="block pl-4 text-sm text-orange-600 font-semibold mb-2 hover:underline">Shop All →</Link>
                  <div className="pl-4 flex flex-col gap-1 border-l border-slate-200">
                    {categories.map((category) => {
                      const categoryProducts = products.filter(p => p.categories.some(c => c.slug === category.slug));
                      return (
                        <div key={category.id} className="mb-2">
                          <Link href={`/category/${category.slug}`} className="text-sm font-semibold hover:text-orange-600 text-slate-700 block mb-1">
                            {category.name}
                          </Link>
                          {categoryProducts.map(p => (
                            <Link key={p.id} href={`/shop/${p.slug}`} className="block text-xs text-slate-500 hover:text-orange-600 py-0.5 pl-2">
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900 mb-2">Solutions</p>
                  <div className="pl-4 flex flex-col gap-2 border-l border-slate-200">
                    {SOLUTIONS_DATA.map((solution) => (
                      <Link key={solution.id} href={`/solutions/${solution.slug}`} className="text-sm hover:text-orange-600 text-slate-600">
                        {solution.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/about" className="text-lg font-medium hover:text-orange-600 mt-2">About</Link>
                <Link href="/contact" className="text-lg font-medium hover:text-orange-600">Contact</Link>
                <Link href="/my-account" className="text-lg font-medium hover:text-orange-600">My Account</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
