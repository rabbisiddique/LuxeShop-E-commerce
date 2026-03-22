'use client';

import { useState } from 'react';
import { Minus, Plus, Package, Tag } from 'lucide-react';

export default function ProductQuantityPicker() {
  const [quantity, setQuantity] = useState(1);
  const maxStock = 10;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#0D0D0D]">Quantity:</span>
        <span className="text-[11px] text-[#9A9A9A]">Max 10 per order</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Counter Control */}
        <div className="flex items-center h-12 border-[1.5px] border-[#E8E8E8] rounded-[10px] overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity === 1}
            className={`w-12 h-full flex items-center justify-center bg-[#FAFAFA] border-r-[1.5px] border-[#E8E8E8] transition-all ${
              quantity === 1 ? "cursor-not-allowed text-[#E8E8E8]" : "text-[#4B4B4B] hover:bg-[#FFF0EB] hover:text-[#FF6B35] active:bg-[#FFE5D9]"
            }`}
          >
            <Minus size={16} />
          </button>
          
          <div className="min-w-[64px] flex items-center justify-center">
            <span className="text-[18px] font-bold text-[#0D0D0D]">{quantity}</span>
          </div>

          <button
            onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
            disabled={quantity === maxStock}
            className={`w-12 h-full flex items-center justify-center bg-[#FAFAFA] border-l-[1.5px] border-[#E8E8E8] transition-all ${
              quantity === maxStock ? "cursor-not-allowed text-[#E8E8E8]" : "text-[#4B4B4B] hover:bg-[#FFF0EB] hover:text-[#FF6B35] active:bg-[#FFE5D9]"
            }`}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Stock Note */}
        <div className="flex items-center gap-1">
          <Package size={12} className="text-[#9A9A9A]" />
          <span className="text-[12px] text-[#9A9A9A]">8 in stock</span>
        </div>
      </div>

      {/* Bulk Discount Note */}
      <div className="bg-[#FFF0EB] border border-dashed border-[#FF6B35] rounded-lg p-2.5 px-3.5 mt-1">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-[#FF6B35]" />
          <span className="text-[12px] font-medium text-[#FF6B35]">
            Buy 3+, save 10% — Buy 5+, save 15%
          </span>
        </div>
      </div>
    </div>
  );
}
