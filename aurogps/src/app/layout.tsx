import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProducts, getCategories } from "@/lib/woocommerce";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AURO GPS | Premium GPS Tracking Solutions",
  description: "Advanced GPS Tracking Solutions for What Matters Most. Explore our premium range of magnetic, wired, and personal GPS trackers.",
};

// Ensure layout never caches so Header always gets live categories/products
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased pt-20`}>
        <Header products={products} categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
