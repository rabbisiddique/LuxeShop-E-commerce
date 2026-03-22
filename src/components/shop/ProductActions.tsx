'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Zap, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductActions() {
  const [status, setStatus] = useState<'default' | 'loading' | 'added'>('default');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('added');
      setTimeout(() => setStatus('default'), 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* PRIMARY ROW: Add to Cart + Wishlist */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={status === 'loading'}
          className={`flex-1 h-[52px] rounded-[10px] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] ${
            status === 'added'
              ? "bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_4px_14px_rgba(22,163,74,0.3)]"
              : status === 'loading'
              ? "bg-[#FF6B35] text-white cursor-wait"
              : "bg-[#FF6B35] hover:bg-[#E55A25] text-white shadow-[0_4px_14px_rgba(255,107,53,0.35)]"
          }`}
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : status === 'added' ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-2.5 border-r-2 border-b-2 border-white rotate-45 -mt-0.5" />
              </div>
              Added to Cart!
            </motion.div>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-[52px] h-[52px] rounded-[10px] border-[1.5px] flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? "bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]"
              : "bg-white border-[#E8E8E8] text-[#9A9A9A] hover:bg-[#FFF0EB] hover:border-[#FF6B35] hover:text-[#FF6B35]"
          }`}
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart size={20} className={isWishlisted ? "fill-[#FF6B35]" : ""} />
          </motion.div>
        </button>
      </div>

      {/* SECONDARY ROW: Buy Now */}
      <button className="w-full h-[52px] bg-[#0D0D0D] hover:bg-[#1F1F1F] text-white font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 transition-all duration-200">
        <Zap size={16} />
        Buy Now
      </button>

      {/* TRUST ROW */}
      <div className="flex justify-center gap-4 py-4 border-t border-[#E8E8E8] mt-1">
        {[
          { icon: RotateCcw, label: "Free Returns" },
          { icon: ShieldCheck, label: "Secure Checkout" },
          { icon: Truck, label: "Ships in 24hrs" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <item.icon size={14} className="text-[#FF6B35]" />
            <span className="text-[11px] font-medium text-[#4B4B4B]">{item.label}</span>
          </div>
        ))}
      </div>

      {/* SOCIAL PROOF STRIP */}
      <div className="bg-[#FFFBEB] p-2 px-4 rounded-lg mt-1 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
        <span className="text-[12px] text-[#D97706] font-medium">
          🔥 47 people viewing this right now
        </span>
      </div>
    </div>
  );
}
