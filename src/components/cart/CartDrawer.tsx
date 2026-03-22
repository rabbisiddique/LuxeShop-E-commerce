'use client';

import { ShoppingBag, X, Truck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CartItem from './CartItem';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    name: 'Premium Wireless Headphones',
    variant: 'Color: Midnight Black / Size: M',
    price: 129.99,
    comparePrice: 179.99,
    initialQty: 2,
    stockCount: 8
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
    name: 'Professional Running Shoes',
    variant: 'Size: US 10 / Color: White',
    price: 229.99,
    comparePrice: null,
    initialQty: 1,
    stockCount: 3
  }
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const router = useRouter();
  const subtotal = 489.97;
  const savings = 80.80;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[100] transition-opacity duration-200"
          />

          {/* DRAWER PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] bg-white z-[101] shadow-[0_24px_64px_rgba(0,0,0,0.14)] flex flex-col"
          >
            {/* DRAWER HEADER */}
            <div className="h-16 px-5 border-b border-[#E8E8E8] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-[#FF6B35]" />
                <h2 className="font-['Playfair_Display'] text-[18px] font-semibold text-[#0D0D0D]">
                  My Cart
                </h2>
                <div className="ml-2 min-w-[20px] h-5 bg-[#FF6B35] rounded-full flex items-center justify-center px-1.5">
                  <span className="text-white text-[12px] font-bold leading-none">2</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#E8E8E8] flex items-center justify-center text-[#4B4B4B] transition-all duration-150"
              >
                <X size={16} />
              </button>
            </div>

            {/* FREE SHIPPING PROGRESS STRIP */}
            <div className="bg-[#FFF0EB] px-5 py-2.5 border-b border-[#FFE0D0] flex-shrink-0">
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#FF6B35]">
                <Truck size={14} />
                <span>Add $42.03 more for FREE shipping!</span>
              </div>
              <div className="w-full h-1 bg-[#FFD4C2] rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-[#FF6B35] w-[58%] rounded-full" />
              </div>
            </div>

            {/* CART ITEMS AREA */}
            <div className="flex-1 overflow-y-auto px-5 scrollbar-thin scrollbar-thumb-[#E8E8E8] hover:scrollbar-thumb-[#FF6B35] scrollbar-track-transparent">
              {mockItems.length > 0 ? (
                <div className="flex flex-col">
                  {mockItems.map((item, index) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      isLast={index === mockItems.length - 1}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-[100px] h-[100px] bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={56} className="text-[#E8E8E8]" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0D0D0D]">Your cart is empty</h3>
                  <p className="text-[14px] text-[#9A9A9A] mt-1">let&apos;s fix that.</p>
                  <button className="mt-5 px-8 py-2.5 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E55A25] transition-all">
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* DRAWER FOOTER */}
            <div className="border-t border-[#E8E8E8] p-5 pb-6 bg-white flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[14px] text-[#4B4B4B]">Subtotal</span>
                <span className="text-[18px] font-bold text-[#0D0D0D]">${subtotal.toFixed(2)}</span>
              </div>

              <div className="text-center mb-3">
                <span className="text-[12px] font-medium text-[#16A34A] bg-[#F0FDF4] px-3 py-1 rounded-full">
                  You save $80.80 🎉
                </span>
              </div>

              <button 
                onClick={() => {
                  router.push('/checkout');
                  onClose();
                }}
                className="w-full h-[50px] bg-[#FF6B35] text-white text-[15px] font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Lock size={15} />
                Checkout · ${subtotal.toFixed(2)}
              </button>

              <button 
                onClick={() => {
                  router.push('/cart');
                  onClose();
                }}
                className="w-full h-11 border-[1.5px] border-[#E8E8E8] text-[#4B4B4B] text-[14px] font-medium rounded-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all mt-2"
              >
                View Cart
              </button>

              <div className="flex justify-center gap-3 mt-3 text-[11px] text-[#9A9A9A] font-medium">
                <span>Visa</span>
                <span>·</span>
                <span>Mastercard</span>
                <span>·</span>
                <span>PayPal</span>
                <span>·</span>
                <span>Apple Pay</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
