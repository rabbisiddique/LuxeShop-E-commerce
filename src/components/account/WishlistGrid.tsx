'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Trash2, Share2, Heart, ArrowRight, Filter, LayoutGrid, List } from 'lucide-react';

export default function WishlistGrid() {
  const [sortBy, setSortBy] = useState('Recently Added');

  const items = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: "$299.00",
      originalPrice: "$349.00",
      image: "https://picsum.photos/seed/headphones/400/400",
      inStock: true,
      onSale: true,
      dateAdded: "Jan 12, 2025"
    },
    {
      id: 2,
      name: "Luxury Leather Weekender Bag",
      category: "Accessories",
      price: "$189.00",
      image: "https://picsum.photos/seed/bag/400/400",
      inStock: true,
      onSale: false,
      dateAdded: "Jan 10, 2025"
    },
    {
      id: 3,
      name: "Minimalist Gold Watch",
      category: "Jewelry",
      price: "$129.00",
      image: "https://picsum.photos/seed/watch/400/400",
      inStock: false,
      onSale: false,
      dateAdded: "Jan 08, 2025"
    },
    {
      id: 4,
      name: "Classic Cotton Trench Coat",
      category: "Apparel",
      price: "$245.00",
      image: "https://picsum.photos/seed/coat/400/400",
      inStock: true,
      onSale: false,
      dateAdded: "Jan 05, 2025"
    }
  ];

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">My Wishlist</h2>
          <p className="text-[14px] text-[#9A9A9A] mt-1">{items.length} items saved for later</p>
        </div>
        <button className="h-[44px] px-6 bg-[#0D0D0D] text-white rounded-full text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#1F1F1F] active:scale-[0.98] transition-all">
          <ShoppingCart size={16} />
          Move All to Cart
        </button>
      </div>

      {/* SORT BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {['Recently Added', 'Price: Low to High', 'Price: High to Low', 'In Stock'].map((option) => (
            <button 
              key={option}
              onClick={() => setSortBy(option)}
              className={`
                px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all
                ${sortBy === option ? 'bg-[#FF6B35] text-white shadow-md' : 'bg-[#F5F5F5] text-[#9A9A9A] hover:bg-[#E8E8E8]'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors">
            <LayoutGrid size={18} />
          </button>
          <button className="p-2 text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors">
            <List size={18} />
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id}
            className="group bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
          >
            {/* IMAGE AREA */}
            <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#DC2626] shadow-sm hover:bg-white transition-all active:scale-[0.9]">
                  <Trash2 size={16} />
                </button>
              </div>

              {item.onSale && (
                <div className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
                  Sale
                </div>
              )}

              {!item.inStock && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-[#0D0D0D] text-white text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                    Out of Stock
                  </div>
                </div>
              )}

              {/* Move to cart bar (hover) */}
              <button 
                disabled={!item.inStock}
                className={`
                  absolute bottom-0 left-0 right-0 h-11 bg-[#0D0D0D] text-white text-[12px] font-bold flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300
                  ${!item.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF6B35]'}
                `}
              >
                <ShoppingCart size={14} />
                Move to Cart
              </button>
            </div>

            {/* CONTENT AREA */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-wider">{item.category}</span>
                <span className="text-[11px] text-[#9A9A9A]">{item.dateAdded}</span>
              </div>
              <h3 className="text-[15px] font-bold text-[#0D0D0D] line-clamp-1 mb-2 group-hover:text-[#FF6B35] transition-colors">
                {item.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#FF6B35]">{item.price}</span>
                {item.onSale && (
                  <span className="text-[13px] text-[#9A9A9A] line-through">{item.originalPrice}</span>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-4 py-3 border-t border-[#F5F5F5] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`} />
                <span className={`text-[11px] font-medium ${item.inStock ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <button className="text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE (Hidden by default) */}
      {items.length === 0 && (
        <div className="py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
            <Heart size={32} className="text-[#9A9A9A]" />
          </div>
          <h3 className="font-['Playfair_Display'] text-[20px] font-bold text-[#0D0D0D]">Your wishlist is empty</h3>
          <p className="text-[14px] text-[#9A9A9A] mt-2 max-w-[300px]">
            Save items you love to your wishlist and they&apos;ll appear here.
          </p>
          <button className="mt-8 h-[48px] px-8 bg-[#FF6B35] text-white rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-[#E55A25] transition-all">
            Start Shopping <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
