'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Trash2, Bookmark, Minus, Plus, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  variant: string;
  price: number;
  comparePrice?: number | null;
  initialQty: number;
  stockCount: number;
  isLast?: boolean;
  key?: string | number;
}

export default function CartItem({
  id,
  image,
  name,
  variant,
  price,
  comparePrice,
  initialQty,
  stockCount,
  isLast = false
}: CartItemProps) {
  const [qty, setQty] = useState(initialQty);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemove = () => {
    setIsRemoved(true);
  };

  return (
    <AnimatePresence>
      {!isRemoved && (
        <motion.div
          layout
          initial={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`group flex gap-4 py-5 items-start transition-colors hover:bg-[#FAFAFA] ${
            !isLast ? 'border-bottom border-[#F5F5F5]' : ''
          }`}
          style={{ borderBottom: !isLast ? '1px solid #F5F5F5' : 'none' }}
        >
          {/* LEFT: Product Image */}
          <div className="relative w-[88px] h-[88px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale(1.03)"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* CENTER: Product Details */}
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-[14px] font-semibold text-[#0D0D0D] line-clamp-2 hover:text-[#FF6B35] cursor-pointer transition-colors">
              {name}
            </h3>
            <p className="text-[12px] text-[#9A9A9A] mt-0.5">
              {variant.replace(' / ', ' · ')}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[15px] font-bold text-[#FF6B35]">
                ${price.toFixed(2)}
              </span>
              {comparePrice && (
                <>
                  <span className="text-[13px] text-[#9A9A9A] line-through">
                    ${comparePrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold text-[#FF6B35] bg-[#FFF0EB] px-1.5 py-0.5 rounded-full">
                    Save ${(comparePrice - price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {stockCount <= 3 && (
              <div className="flex items-center gap-1 mt-1 text-[#D97706]">
                <AlertTriangle size={11} />
                <span className="text-[11px] font-medium">Only {stockCount} left!</span>
              </div>
            )}

            <div className="flex items-center gap-4 mt-2.5">
              <button className="flex items-center gap-1 text-[12px] text-[#4B4B4B] hover:text-[#FF6B35] transition-colors">
                <Bookmark size={12} />
                Save for Later
              </button>
              <div className="w-[1px] h-3 bg-[#E8E8E8]" />
              <button 
                onClick={handleRemove}
                className="flex items-center gap-1 text-[12px] text-[#9A9A9A] hover:text-[#DC2626] transition-colors"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>
          </div>

          {/* RIGHT: Quantity + Subtotal */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center h-9 border-[1.5px] border-[#E8E8E8] rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-full flex items-center justify-center bg-[#FAFAFA] border-r border-[#E8E8E8] text-[#4B4B4B] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all"
              >
                <Minus size={14} />
              </button>
              <div className="w-10 flex items-center justify-center">
                <span className="text-[14px] font-semibold text-[#0D0D0D]">{qty}</span>
              </div>
              <button
                onClick={() => setQty(Math.min(stockCount, qty + 1))}
                className="w-9 h-full flex items-center justify-center bg-[#FAFAFA] border-l border-[#E8E8E8] text-[#4B4B4B] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all"
              >
                <Plus size={14} />
              </button>
            </div>
            <div className="text-right">
              <span className="text-[16px] font-bold text-[#0D0D0D]">
                ${(price * qty).toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
