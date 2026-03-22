'use client';

import { useCartStore } from '@/src/store/cart';
import CartDrawer from '@/src/components/cart/CartDrawer';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  
  return (
    <>
      {children}
      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}
