'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const sampleFilters = [
  { id: 'cat', label: 'Category: Electronics' },
  { id: 'price', label: 'Price: $50 – $200' },
  { id: 'rating', label: '★ 4 & Up' },
  { id: 'tag1', label: 'Tag: Wireless' },
  { id: 'tag2', label: 'Tag: Premium' },
];

export default function ActiveFilterChips({ category }: { category?: string }) {
  const filters = category 
    ? [{ id: 'cat', label: `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}` }, ...sampleFilters.slice(1)]
    : sampleFilters;

  if (filters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap mb-4 overflow-x-auto scrollbar-hide pb-1">
      <span className="text-[12px] font-bold text-[#4B4B4B] uppercase tracking-[0.8px] flex-shrink-0 mr-1">
        Active Filters:
      </span>

      <AnimatePresence>
        {filters.map((filter) => (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 bg-[#FFF0EB] border border-[#FF6B35] rounded-full pl-3 pr-1.5 py-1.5 group hover:bg-[#FFE5D9] transition-colors cursor-default"
          >
            <span className="text-[12px] font-medium text-[#FF6B35] whitespace-nowrap">
              {filter.label}
            </span>
            <button 
              onClick={() => {
                if (filter.id === 'cat') {
                  window.location.href = '/shop';
                }
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[#FF6B35] hover:bg-[#FFE5D9] transition-colors"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <button className="px-3 py-1.5 border border-[#E8E8E8] rounded-full text-[12px] font-medium text-[#4B4B4B] hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FFF0EB] transition-all duration-150 whitespace-nowrap">
        Clear All
      </button>
    </div>
  );
}
