import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Product, Category } from "./types";

export const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
  queryStringAuth: true,
});

export async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get("products", { per_page: 50 });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data } = await api.get("products", { slug });
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await api.get("products/categories", { per_page: 50 });
    // Filter out the 'Uncategorized' default category if desired
    return data.filter((cat: Category) => cat.slug !== 'uncategorized');
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data } = await api.get("products/categories", { slug });
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const { data } = await api.get("products", { category: categoryId.toString(), per_page: 50 });
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}
