'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '@/src/components/shop/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  compare_at_price?: number;
  image_url: string;
  category?: { name: string };
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      const index = Math.round(scrollLeft / (clientWidth / 3));
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Header with Controls */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-[2px] block mb-2">
            HANDPICKED FOR YOU
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
            Featured Products
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center transition-all duration-300 ${
              canScrollLeft ? 'hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white text-[#1F1F1F]' : 'opacity-40 cursor-not-allowed text-[#9A9A9A]'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center transition-all duration-300 ${
              canScrollRight ? 'hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white text-[#1F1F1F]' : 'opacity-40 cursor-not-allowed text-[#9A9A9A]'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] snap-start"
          >
            <ProductCard 
              image={product.image_url}
              name={product.name}
              price={product.price}
              comparePrice={product.compare_at_price}
              category={product.category?.name}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4 mb-12">
        {[...Array(Math.ceil(products.length / 2))].map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              Math.floor(activeIndex / 2) === i ? 'w-6 bg-[#FF6B35]' : 'w-1.5 bg-[#E8E8E8]'
            }`}
          />
        ))}
      </div>

      {/* Footer Link */}
      <div className="flex justify-center">
        <Link 
          href="/products"
          className="px-8 py-3 border border-[#E8E8E8] text-[#1F1F1F] font-bold text-sm uppercase tracking-widest hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          View All Products <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
