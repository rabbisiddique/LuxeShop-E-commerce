'use client';

import CartItem from '@/src/components/cart/CartItem';
import CartSummary from '@/src/components/cart/CartSummary';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const mockItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    name: 'Premium Wireless Headphones',
    variant: 'Color: Midnight Black / Size: M',
    price: 129.99,
    comparePrice: 179.99,
    initialQty: 2,
    stockCount: 8
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    name: 'Professional Running Shoes',
    variant: 'Size: US 10 / Color: White',
    price: 229.99,
    comparePrice: null,
    initialQty: 1,
    stockCount: 3
  }
];

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumbs / Back */}
        <Link 
          href="/"
          className="flex items-center gap-2 text-[14px] text-[#4B4B4B] hover:text-[#FF6B35] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Shopping
        </Link>

        <div className="flex items-center gap-3 mb-10">
          <h1 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
            Your Shopping Cart
          </h1>
          <div className="bg-[#FF6B35] text-white text-[14px] font-bold px-3 py-1 rounded-full">
            3 Items
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="hidden sm:grid grid-cols-[1fr_120px] pb-4 border-b border-[#F5F5F5] mb-2">
                <span className="text-[12px] font-bold text-[#9A9A9A] uppercase tracking-wider">Product Details</span>
                <span className="text-[12px] font-bold text-[#9A9A9A] uppercase tracking-wider text-right">Total</span>
              </div>
              
              <div className="flex flex-col">
                {mockItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    isLast={index === mockItems.length - 1}
                  />
                ))}
              </div>

              {/* Empty Cart Placeholder (for design) */}
              {mockItems.length === 0 && (
                <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-[#E8E8E8]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0D0D0D]">Your cart is empty</h2>
                  <p className="text-[#9A9A9A] mt-2">Looks like you haven&apos;t added anything yet.</p>
                  <button className="mt-8 px-8 py-3 bg-[#FF6B35] text-white font-bold rounded-xl shadow-lg">
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Recommendations or Trust Badges could go here */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#E8E8E8] flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#16A34A]">
                  <ShoppingBag size={20} />
                </div>
                <h4 className="text-[14px] font-bold text-[#0D0D0D]">Easy Returns</h4>
                <p className="text-[12px] text-[#9A9A9A]">30-day hassle-free returns on all orders.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#E8E8E8] flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#D97706]">
                  <ShoppingBag size={20} />
                </div>
                <h4 className="text-[14px] font-bold text-[#0D0D0D]">Secure Payment</h4>
                <p className="text-[12px] text-[#9A9A9A]">Your data is protected by 256-bit encryption.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#E8E8E8] flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                  <ShoppingBag size={20} />
                </div>
                <h4 className="text-[14px] font-bold text-[#0D0D0D]">24/7 Support</h4>
                <p className="text-[12px] text-[#9A9A9A]">Our team is here to help you anytime.</p>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:w-[380px] flex-shrink-0">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
