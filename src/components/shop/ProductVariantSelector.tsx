'use client';

import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

const colors = [
  { name: 'Midnight Black', hex: '#1a1a1a' },
  { name: 'Pearl White', hex: '#f5f0eb' },
  { name: 'Midnight Blue', hex: '#1e3a5f' },
  { name: 'Forest Green', hex: '#2d5a27', outOfStock: true },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const storageOptions = [
  { size: '64GB', modifier: 'Included' },
  { size: '128GB', modifier: '+$50' },
  { size: '256GB', modifier: '+$120' },
];

export default function ProductVariantSelector() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [showError, setShowError] = useState(false);

  return (
    <div className="flex flex-col gap-6 py-6 border-y border-[#E8E8E8]">
      {/* COLOR VARIANT */}
      <div>
        <div className="flex items-center mb-2.5">
          <span className="text-[13px] font-semibold text-[#0D0D0D]">Color:</span>
          <span className="text-[13px] text-[#4B4B4B] ml-2">{selectedColor.name}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => !color.outOfStock && setSelectedColor(color)}
              className={`relative w-9 h-9 rounded-full transition-all duration-150 ${
                color.outOfStock ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              } ${
                selectedColor.name === color.name
                  ? "border-2 border-[#FF6B35] shadow-[0_0_0_3px_rgba(255,107,53,0.2)]"
                  : "border-2 border-transparent shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] hover:shadow-[0_0_0_3px_rgba(255,107,53,0.15)]"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {color.outOfStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-[#9A9A9A] rotate-45" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SIZE VARIANT */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center">
            <span className="text-[13px] font-semibold text-[#0D0D0D]">Size:</span>
            <span className="text-[13px] text-[#4B4B4B] ml-2">{selectedSize}</span>
          </div>
          <button className="text-[12px] text-[#FF6B35] hover:underline">
            Size Guide →
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[52px] h-10 px-3 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
                selectedSize === size
                  ? "bg-[#FF6B35] border-[1.5px] border-[#FF6B35] text-white shadow-[0_4px_14px_rgba(255,107,53,0.3)]"
                  : "bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] text-[#1F1F1F] hover:border-[#FF6B35] hover:text-[#FF6B35]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* STORAGE VARIANT */}
      <div>
        <div className="flex items-center mb-2.5">
          <span className="text-[13px] font-semibold text-[#0D0D0D]">Storage:</span>
          <span className="text-[13px] text-[#4B4B4B] ml-2">{selectedStorage}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {storageOptions.map((opt) => (
            <button
              key={opt.size}
              onClick={() => setSelectedStorage(opt.size)}
              className={`relative flex flex-col items-start p-2.5 px-4 rounded-lg border-[1.5px] transition-all duration-150 ${
                selectedStorage === opt.size
                  ? "bg-[#FFF0EB] border-[#FF6B35]"
                  : "bg-[#FAFAFA] border-[#E8E8E8] hover:border-[#FF6B35]"
              }`}
            >
              <span className={`text-[14px] font-bold ${selectedStorage === opt.size ? "text-[#FF6B35]" : "text-[#0D0D0D]"}`}>
                {opt.size}
              </span>
              <span className="text-[11px] text-[#9A9A9A]">{opt.modifier}</span>
              {selectedStorage === opt.size && (
                <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#FF6B35] rounded-full flex items-center justify-center">
                  <Check size={8} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {showError && (
        <div className="flex items-center gap-2 text-[#DC2626] animate-[shake_0.3s_ease-in-out]">
          <AlertCircle size={12} />
          <span className="text-[12px]">Please select a size</span>
        </div>
      )}
    </div>
  );
}
