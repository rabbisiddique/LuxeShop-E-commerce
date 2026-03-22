'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Star, Check } from 'lucide-react';

export default function FilterSidebar({ activeCategory }: { activeCategory?: string }) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true,
    tags: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    { name: 'Electronics', count: 42, slug: 'electronics' },
    { name: 'Fashion', count: 38, slug: 'fashion' },
    { name: 'Beauty', count: 24, slug: 'beauty' },
    { name: 'Sports', count: 31, slug: 'sports' },
    { name: 'Home & Living', count: 19, slug: 'home-living' },
  ];

  return (
    <aside className="hidden lg:block w-[260px] flex-shrink-0 bg-white border border-[#E8E8E8] rounded-xl overflow-hidden sticky top-[88px] h-fit">
      {/* Sidebar Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#E8E8E8] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#0D0D0D]" />
          <span className="text-base font-semibold text-[#0D0D0D]">Filters</span>
        </div>
        <button className="text-[12px] font-medium text-[#FF6B35] hover:underline">
          Clear All
        </button>
      </div>

      {/* SECTION 1: CATEGORIES */}
      <div className="border-b border-[#E8E8E8]">
        <button 
          onClick={() => toggleSection('categories')}
          className="w-full px-5 py-5 flex items-center justify-between group"
        >
          <span className="text-[12px] font-bold text-[#0D0D0D] uppercase tracking-[0.8px]">Categories</span>
          <ChevronDown 
            size={16} 
            className={`text-[#9A9A9A] transition-transform duration-300 ${openSections.categories ? '' : '-rotate-90'}`} 
          />
        </button>
        <div className={`px-5 pb-5 space-y-2 overflow-hidden transition-all duration-300 ${openSections.categories ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {categories.map((cat) => (
            <label key={cat.name} className="flex items-center gap-3 group cursor-pointer hover:bg-[#FAFAFA] p-1.5 -mx-1.5 rounded-md transition-colors">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={activeCategory?.toLowerCase() === cat.slug}
                  onChange={() => {
                    if (activeCategory?.toLowerCase() === cat.slug) {
                      window.location.href = '/shop';
                    } else {
                      window.location.href = `/category/${cat.slug}`;
                    }
                  }}
                  className="peer appearance-none w-4 h-4 border-[1.5px] border-[#E8E8E8] rounded-[4px] checked:bg-[#FF6B35] checked:border-[#FF6B35] hover:border-[#FF6B35] transition-all cursor-pointer" 
                />
                <Check size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className={`text-sm ${activeCategory?.toLowerCase() === cat.slug ? 'text-[#FF6B35] font-semibold' : 'text-[#1F1F1F]'}`}>{cat.name}</span>
              <span className="text-[12px] text-[#9A9A9A] ml-auto">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SECTION 2: PRICE RANGE */}
      <div className="border-b border-[#E8E8E8]">
        <button 
          onClick={() => toggleSection('price')}
          className="w-full px-5 py-5 flex items-center justify-between group"
        >
          <span className="text-[12px] font-bold text-[#0D0D0D] uppercase tracking-[0.8px]">Price Range</span>
          <ChevronDown 
            size={16} 
            className={`text-[#9A9A9A] transition-transform duration-300 ${openSections.price ? '' : '-rotate-90'}`} 
          />
        </button>
        <div className={`px-5 pb-5 overflow-hidden transition-all duration-300 ${openSections.price ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9A9A9A]">$</span>
              <input type="number" placeholder="Min" className="w-full h-9 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg pl-6 pr-2 text-[13px] text-center outline-none focus:border-[#FF6B35] transition-colors" />
            </div>
            <span className="text-[#9A9A9A]">–</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9A9A9A]">$</span>
              <input type="number" placeholder="Max" className="w-full h-9 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg pl-6 pr-2 text-[13px] text-center outline-none focus:border-[#FF6B35] transition-colors" />
            </div>
          </div>
          {/* Design-only Range Slider */}
          <div className="relative h-1 w-full bg-[#E8E8E8] rounded-full mb-2">
            <div className="absolute left-[20%] right-[30%] h-full bg-[#FF6B35] rounded-full" />
            <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#FF6B35] rounded-full shadow-sm cursor-pointer" />
            <div className="absolute right-[30%] top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#FF6B35] rounded-full shadow-sm cursor-pointer" />
          </div>
        </div>
      </div>

      {/* SECTION 3: RATING */}
      <div className="border-b border-[#E8E8E8]">
        <button 
          onClick={() => toggleSection('rating')}
          className="w-full px-5 py-5 flex items-center justify-between group"
        >
          <span className="text-[12px] font-bold text-[#0D0D0D] uppercase tracking-[0.8px]">Rating</span>
          <ChevronDown 
            size={16} 
            className={`text-[#9A9A9A] transition-transform duration-300 ${openSections.rating ? '' : '-rotate-90'}`} 
          />
        </button>
        <div className={`px-5 pb-5 space-y-2 overflow-hidden transition-all duration-300 ${openSections.rating ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {[5, 4, 3, 2, 1].map((stars) => (
            <label key={stars} className="flex items-center gap-3 group cursor-pointer hover:bg-[#FAFAFA] p-1.5 -mx-1.5 rounded-md transition-colors">
              <div className="relative flex items-center justify-center">
                <input type="radio" name="rating" className="peer appearance-none w-4 h-4 border-[1.5px] border-[#E8E8E8] rounded-full checked:border-[#FF6B35] transition-all cursor-pointer" />
                <div className="absolute w-2 h-2 bg-[#FF6B35] rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < stars ? "text-[#FF6B35] fill-[#FF6B35]" : "text-[#E8E8E8]"} />
                ))}
              </div>
              <span className="text-[13px] text-[#9A9A9A]">{stars < 5 ? "& Up" : ""}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SECTION 4: AVAILABILITY */}
      <div className="border-b border-[#E8E8E8]">
        <button 
          onClick={() => toggleSection('availability')}
          className="w-full px-5 py-5 flex items-center justify-between group"
        >
          <span className="text-[12px] font-bold text-[#0D0D0D] uppercase tracking-[0.8px]">Availability</span>
          <ChevronDown 
            size={16} 
            className={`text-[#9A9A9A] transition-transform duration-300 ${openSections.availability ? '' : '-rotate-90'}`} 
          />
        </button>
        <div className={`px-5 pb-5 space-y-4 overflow-hidden transition-all duration-300 ${openSections.availability ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {[
            { label: 'In Stock Only', active: true },
            { label: 'On Sale Only', active: false },
          ].map((toggle) => (
            <div key={toggle.label} className="flex items-center justify-between">
              <span className="text-sm text-[#1F1F1F]">{toggle.label}</span>
              <button className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${toggle.active ? 'bg-[#FF6B35]' : 'bg-[#E8E8E8]'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${toggle.active ? 'left-[18px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: TAGS */}
      <div>
        <button 
          onClick={() => toggleSection('tags')}
          className="w-full px-5 py-5 flex items-center justify-between group"
        >
          <span className="text-[12px] font-bold text-[#0D0D0D] uppercase tracking-[0.8px]">Popular Tags</span>
          <ChevronDown 
            size={16} 
            className={`text-[#9A9A9A] transition-transform duration-300 ${openSections.tags ? '' : '-rotate-90'}`} 
          />
        </button>
        <div className={`px-5 pb-5 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-300 ${openSections.tags ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {["Wireless", "Premium", "Sale", "New", "Bestseller", "Eco-friendly", "Luxury"].map((tag, i) => (
            <button 
              key={tag} 
              className={`px-3 py-1.5 rounded-full text-[12px] border transition-all duration-200 ${
                i === 1 
                  ? "bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]" 
                  : "bg-[#F5F5F5] border-[#E8E8E8] text-[#4B4B4B] hover:border-[#FF6B35]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
