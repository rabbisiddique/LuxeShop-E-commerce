'use client';

import { useState } from 'react';
import { Tag, X, Info, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CartSummary() {
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const subtotal = 489.97;
  const threshold = 100;
  const progress = Math.min((subtotal / threshold) * 100, 100);

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden sticky top-[88px] shadow-sm">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-[#E8E8E8]">
        <h2 className="font-['Playfair_Display'] text-[18px] font-semibold text-[#0D0D0D]">
          Order Summary
        </h2>
      </div>

      {/* PROMO CODE SECTION */}
      <div className="px-6 py-5 border-b border-[#E8E8E8]">
        <label className="block text-[12px] font-bold text-[#0D0D0D] uppercase tracking-[0.8px] mb-2.5">
          Promo Code
        </label>
        
        {!isPromoApplied ? (
          <div className="flex">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] border-r-0 rounded-l-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
            <button 
              onClick={() => setIsPromoApplied(true)}
              className="h-11 px-5 bg-[#0D0D0D] hover:bg-[#1F1F1F] text-white text-[13px] font-semibold rounded-r-lg transition-all duration-200"
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 transition-all">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-[#16A34A]" />
              <span className="text-[13px] font-semibold text-[#0D0D0D]">SAVE30</span>
              <span className="text-[13px] font-semibold text-[#16A34A] ml-2">−$30.00</span>
            </div>
            <button 
              onClick={() => setIsPromoApplied(false)}
              className="text-[#9A9A9A] hover:text-[#DC2626] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* COST BREAKDOWN */}
      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-[#4B4B4B]">Subtotal (3 items)</span>
          <span className="text-[14px] font-medium text-[#0D0D0D]">${subtotal.toFixed(2)}</span>
        </div>

        {isPromoApplied && (
          <div className="flex justify-between items-center text-[#16A34A]">
            <div className="flex items-center gap-1.5">
              <Tag size={13} />
              <span className="text-[14px]">Promo: SAVE30</span>
            </div>
            <span className="text-[14px] font-semibold">−$30.00</span>
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <span className="text-[14px] text-[#4B4B4B]">Shipping</span>
            <p className="text-[11px] text-[#9A9A9A] mt-0.5">Standard delivery (3–5 days)</p>
          </div>
          <span className="text-[14px] font-semibold text-[#16A34A]">FREE</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] text-[#4B4B4B]">Estimated Tax</span>
            <Info size={12} className="text-[#9A9A9A] cursor-help" />
          </div>
          <span className="text-[14px] font-medium text-[#0D0D0D]">$39.20</span>
        </div>

        <div className="h-[1px] bg-[#E8E8E8] my-1" />

        <div className="flex justify-between items-center">
          <span className="text-[16px] font-bold text-[#0D0D0D]">Total</span>
          <span className="text-[20px] font-extrabold text-[#FF6B35]">$499.17</span>
        </div>

        <div className="bg-[#FFF0EB] rounded-lg p-2.5 px-3.5 flex items-center gap-2 mt-1">
          <Sparkles size={14} className="text-[#FF6B35]" />
          <span className="text-[13px] font-semibold text-[#FF6B35]">
            You&apos;re saving $80.80 on this order!
          </span>
        </div>
      </div>

      {/* CHECKOUT BUTTON */}
      <div className="px-6 pb-6">
        <Link 
          href="/checkout"
          className="w-full h-[52px] bg-[#FF6B35] hover:bg-[#E55A25] text-white text-[15px] font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Lock size={16} />
          Proceed to Checkout
        </Link>

        <div className="flex flex-col items-center mt-3">
          <div className="flex items-center gap-4 text-[11px] font-medium text-[#9A9A9A]">
            <span>Visa</span>
            <div className="w-1 h-1 bg-[#E8E8E8] rounded-full" />
            <span>Mastercard</span>
            <div className="w-1 h-1 bg-[#E8E8E8] rounded-full" />
            <span>PayPal</span>
            <div className="w-1 h-1 bg-[#E8E8E8] rounded-full" />
            <span>Apple Pay</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[#9A9A9A]">
            <ShieldCheck size={12} />
            <span className="text-[11px]">Secure 256-bit SSL encryption</span>
          </div>
        </div>
      </div>

      {/* FREE SHIPPING PROGRESS */}
      {subtotal < threshold && (
        <div className="px-6 pb-5 border-t border-[#E8E8E8] pt-4">
          <p className="text-[13px] text-[#4B4B4B]">
            Add <span className="font-bold text-[#FF6B35]">${(threshold - subtotal).toFixed(2)}</span> more for <span className="font-bold">FREE</span> shipping!
          </p>
          <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-[#FF6B35] transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
