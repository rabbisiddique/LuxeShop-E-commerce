'use client';

import { useState } from 'react';
import { LayoutGrid, List, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

export default function SortBar() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSort, setActiveSort] = useState('Featured');

  const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Newest First',
    'Best Selling',
    'Top Rated',
  ];

  return (
    <div className="w-full bg-white border border-[#E8E8E8] rounded-xl px-4 py-3 flex items-center justify-between mb-4">
      {/* LEFT: Result Count */}
      <div className="hidden sm:block">
        <p className="font-['DM_Sans'] text-[13px] text-[#4B4B4B]">
          Showing <span className="font-medium">1–12</span> of <span className="font-bold text-[#0D0D0D]">124</span> products
        </p>
      </div>

      {/* MOBILE: Filter Trigger */}
      <button className="sm:hidden flex items-center gap-2 text-sm font-medium text-[#1F1F1F]">
        <div className="relative">
          <SlidersHorizontal size={18} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF6B35] text-white text-[9px] flex items-center justify-center rounded-full">2</span>
        </div>
        Filters
      </button>

      {/* CENTER: Active Filters Summary (Desktop Only) */}
      <div className="hidden md:block">
        <button className="text-[12px] font-medium text-[#FF6B35] hover:underline">
          2 filters active
        </button>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]' 
                : 'bg-transparent border-[#E8E8E8] text-[#9A9A9A] hover:bg-[#F5F5F5]'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]' 
                : 'bg-transparent border-[#E8E8E8] text-[#9A9A9A] hover:bg-[#F5F5F5]'
            }`}
          >
            <List size={18} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] font-medium text-[#1F1F1F] hover:border-[#FF6B35] transition-all duration-200"
          >
            <span className="text-[#9A9A9A] font-normal">Sort:</span> {activeSort}
            <ChevronDown size={14} className={`text-[#9A9A9A] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Card */}
          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E8E8E8] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.10)] z-20 py-1 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setIsSortOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                      activeSort === option 
                        ? 'bg-[#FFF0EB] text-[#FF6B35]' 
                        : 'text-[#1F1F1F] hover:bg-[#FAFAFA]'
                    }`}
                  >
                    {option}
                    {activeSort === option && <Check size={14} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
