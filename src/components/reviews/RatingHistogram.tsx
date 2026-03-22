'use client';

import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import ReviewForm from './ReviewForm';

const ratings = [
  { stars: 5, percentage: 68, count: 1936 },
  { stars: 4, percentage: 19, count: 541 },
  { stars: 3, percentage: 8, count: 228 },
  { stars: 2, percentage: 3, count: 85 },
  { stars: 1, percentage: 2, count: 57 },
];

interface RatingHistogramProps {
  productName?: string;
  productImage?: string;
}

export default function RatingHistogram({ 
  productName = "Premium Wireless Headphones",
  productImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"
}: RatingHistogramProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-xl p-7">
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Overall Score */}
        <div className="flex flex-col items-center justify-center min-w-[140px]">
          <span className="text-[64px] font-extrabold text-[#0D0D0D] leading-none">4.7</span>
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={20} className="text-[#FF6B35] fill-[#FF6B35]" />
            ))}
            <div className="relative">
              <Star size={20} className="text-[#E8E8E8]" />
              <div className="absolute inset-0 overflow-hidden w-[70%]">
                <Star size={20} className="text-[#FF6B35] fill-[#FF6B35]" />
              </div>
            </div>
          </div>
          <span className="text-[13px] text-[#9A9A9A] mt-1.5">2,847 reviews</span>
        </div>

        {/* Vertical Divider (Desktop Only) */}
        <div className="hidden md:block w-[1px] bg-[#E8E8E8] self-stretch" />

        {/* RIGHT: Bar Histogram */}
        <div className="flex-1 flex flex-col gap-2.5">
          {ratings.map((item, i) => (
            <div key={item.stars} className="flex items-center gap-3 group cursor-pointer">
              <div className="flex items-center gap-1 min-w-[32px]">
                <span className="text-[13px] font-semibold text-[#0D0D0D]">{item.stars}</span>
                <Star size={12} className="text-[#FF6B35] fill-[#FF6B35]" />
              </div>

              <div className="flex-1 h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full transition-colors group-hover:brightness-110 ${
                    item.stars === 5 ? "bg-[#FF6B35]" :
                    item.stars === 4 ? "bg-[#FF6B35]/70" :
                    item.stars === 3 ? "bg-[#FF6B35]/50" :
                    item.stars === 2 ? "bg-[#FF6B35]/30" :
                    "bg-[#FF6B35]/20"
                  }`}
                />
              </div>

              <span className="text-[12px] font-semibold text-[#4B4B4B] min-w-[36px] text-right">
                {item.percentage}%
              </span>
              <span className="text-[11px] text-[#9A9A9A] min-w-[56px]">
                ({item.count.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Button */}
      <div className="mt-8">
        <button 
          onClick={() => setIsFormOpen(true)}
          className="w-full h-12 bg-[#0D0D0D] text-white rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#1F1F1F] transition-all active:scale-[0.98]"
        >
          <MessageSquare size={18} />
          Write a Review
        </button>
      </div>

      {/* BOTTOM: Summary Tags */}
      <div className="border-t border-[#E8E8E8] mt-6 pt-6">
        <p className="text-[12px] font-bold text-[#4B4B4B] uppercase tracking-wider mb-2.5">
          Most mentioned:
        </p>
        <div className="flex flex-wrap gap-2">
          {["Sound Quality ✓", "Comfort ✓", "Battery Life ✓", "Value ✓", "Design ✓"].map((tag) => (
            <span
              key={tag}
              className="bg-[#FFF0EB] border border-[#FF6B35] text-[12px] text-[#FF6B35] font-medium px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={{
          name: productName,
          image: productImage,
          purchaseDate: "March 12, 2026"
        }}
      />
    </div>
  );
}
