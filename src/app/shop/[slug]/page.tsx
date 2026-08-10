import { notFound } from 'next/navigation';
import { getProductBySlug, getProductsByCategory } from '@/lib/woocommerce';
import Image from 'next/image';
import Link from 'next/link';
import { ProductClient } from '@/components/products/ProductClient';
import { Product } from '@/lib/types';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | AURO GPS`,
    description: product.short_description.replace(/<[^>]+>/g, ''),
  };
}

// Revalidate every hour or as needed (0 for no cache during dev)
export const revalidate = 0;

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Fetch similar products from the same category
  let similarProducts: Product[] = [];
  if (product.categories && product.categories.length > 0) {
    const categoryId = product.categories[0].id;
    const productsInCategory = await getProductsByCategory(categoryId);
    // Filter out the current product and limit to 4
    similarProducts = productsInCategory
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-orange-600 transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        {product.categories[0] && (
          <>
            <Link href={`/category/${product.categories[0].slug}`} className="hover:text-orange-600 transition-colors">
              {product.categories[0].name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-slate-900 font-medium truncate">{product.name}</span>
      </div>

      <ProductClient product={product} />

      {similarProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Similar products you may like</h2>
            <Link href={`/category/${product.categories[0].slug}`} className="text-orange-600 font-semibold hover:underline hidden sm:block">
              View all in this category &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative bg-slate-50 aspect-square p-6 flex items-center justify-center overflow-hidden">
                  {p.on_sale && (
                    <div className="absolute top-3 left-3 z-10 bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {p.images && p.images[0] ? (
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt || p.name}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-slate-400 text-sm">No Image</div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                    {p.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-lg">
                        ${parseFloat(p.price || '0').toFixed(2)}
                      </span>
                      {p.on_sale && p.regular_price && (
                        <span className="text-sm text-slate-400 line-through">
                          ${parseFloat(p.regular_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

