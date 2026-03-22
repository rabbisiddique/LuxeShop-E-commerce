'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Tag, ChevronDown, Lock, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

const mockItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    name: 'Premium Wireless Headphones',
    variant: 'Black · Size M',
    price: 129.99,
    qty: 1
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
    name: 'Professional Running Shoes',
    variant: 'White · Size US10',
    price: 229.99,
    qty: 2
  }
];

export default function OrderSummaryPanel() {
  const [isPromoOpen, setIsPromoOpen] = useState(true);

  return (
    <div className="bg-[#FAFAFA] border border-[#E8E8E8] rounded-2xl overflow-hidden sticky top-[88px] shadow-sm">
      {/* HEADER */}
      <div className="bg-white px-6 py-5 border-b border-[#E8E8E8] flex items-center justify-between">
        <h2 className="font-['Playfair_Display'] text-[18px] font-semibold text-[#0D0D0D]">
          Order Summary
        </h2>
        <span className="text-[12px] text-[#9A9A9A]">3 items</span>
      </div>

      {/* ITEMS LIST */}
      <div className="px-6 py-4 border-b border-[#E8E8E8] flex flex-col gap-4">
        {mockItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8] flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FF6B35] rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-[11px] font-bold">{item.qty}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold text-[#0D0D0D] line-clamp-2">{item.name}</h3>
              <p className="text-[11px] text-[#9A9A9A] mt-0.5">{item.variant}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-[13px] font-bold text-[#0D0D0D]">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PROMO CODE SECTION */}
      <div className="px-6 py-4 border-b border-[#E8E8E8]">
        <button
          onClick={() => setIsPromoOpen(!isPromoOpen)}
          className="flex items-center gap-2 text-[13px] font-medium text-[#FF6B35] hover:underline transition-all"
        >
          <Tag size={14} />
          <span>Have a promo code?</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isPromoOpen ? 'rotate-180' : ''}`} />
        </button>

        {isPromoOpen && (
          <div className="mt-3 flex gap-0">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 h-10 bg-white border-[1.5px] border-[#E8E8E8] border-r-0 rounded-l-lg px-3 text-[13px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
            <button className="h-10 px-4 bg-[#0D0D0D] hover:bg-[#1F1F1F] text-white text-[12px] font-semibold rounded-r-lg transition-all">
              Apply
            </button>
          </div>
        )}
      </div>

      {/* COST BREAKDOWN */}
      <div className="px-6 py-4 flex flex-col gap-2.5">
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#4B4B4B]">Subtotal</span>
          <span className="text-[#0D0D0D] font-medium">$589.97</span>
        </div>
        <div className="flex justify-between items-center text-[14px] text-[#16A34A]">
          <span className="flex items-center gap-1.5">
            <Tag size={13} />
            Promo: SAVE30
          </span>
          <span className="font-semibold">−$30.00</span>
        </div>
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#4B4B4B]">Shipping</span>
          <span className="text-[#16A34A] font-semibold">FREE</span>
        </div>
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#4B4B4B]">Estimated Tax</span>
          <span className="text-[#0D0D0D] font-medium">$47.20</span>
        </div>

        <div className="h-[1px] bg-[#E8E8E8] my-1" />

        <div className="flex justify-between items-center">
          <span className="text-[16px] font-bold text-[#0D0D0D]">Total</span>
          <span className="text-[22px] font-extrabold text-[#FF6B35]">$607.17</span>
        </div>

        <div className="bg-[#FFF0EB] rounded-lg p-2.5 px-3 mt-3 flex items-center gap-2">
          <Sparkles size={14} className="text-[#FF6B35]" />
          <span className="text-[13px] font-semibold text-[#FF6B35]">
            You save $80.80 on this order!
          </span>
        </div>
      </div>

      {/* SECURITY FOOTER */}
      <div className="px-6 py-5 border-t border-[#E8E8E8] flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5 text-[#9A9A9A]">
          <Lock size={14} />
          <span className="text-[12px] text-center">Secure checkout — 256-bit SSL</span>
        </div>
        
        <div className="flex items-center gap-3 text-[11px] text-[#9A9A9A] font-medium">
          <span>Visa</span>
          <span>·</span>
          <span>Mastercard</span>
          <span>·</span>
          <span>PayPal</span>
          <span>·</span>
          <span>Stripe</span>
        </div>

        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#9A9A9A]">
            <RotateCcw size={11} />
            <span>Free Returns</span>
          </div>
          <div className="w-[1px] h-3 bg-[#E8E8E8]" />
          <div className="flex items-center gap-1.5 text-[11px] text-[#9A9A9A]">
            <ShieldCheck size={11} />
            <span>Buyer Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
