import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        if (!product || typeof product.id !== 'number' || product.id <= 0) return;
        set((state) => {
          const validItems = (state.items || []).filter(
            (i) => i.product && typeof i.product.id === 'number' && i.product.id > 0
          );
          const existingItem = validItems.find((i) => i.product.id === product.id);
          if (existingItem) {
            return {
              items: validItems.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              cartOpen: true,
            };
          }
          return { items: [...validItems, { product, quantity }], cartOpen: true };
        });
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product && i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product && i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
    }),
    {
      name: 'aurogps-cart',
      partialize: (state) => ({
        items: (state.items || []).filter(
          (i) => i.product && typeof i.product.id === 'number' && i.product.id > 0
        ),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.items = (state.items || []).filter(
            (i) => i.product && typeof i.product.id === 'number' && i.product.id > 0
          );
        }
      },
    }
  )
);
