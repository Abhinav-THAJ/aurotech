import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number | undefined | null): string {
  if (price === undefined || price === null || price === '') return '';
  const val = typeof price === 'number' ? price : parseFloat(String(price));
  if (isNaN(val)) return '';
  return `₹${val.toFixed(2)}`;
}

