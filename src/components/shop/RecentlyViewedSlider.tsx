'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/src/components/shop/ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const RECENTLY_VIEWED = [
  {
    id: 'rv1',
    name: 'Modern Desk Lamp',
    price: 89.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    reviewCount: 45,
  },
  {
    id: 'rv2',
    name: 'Leather Messenger Bag',
    price: 145.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 32,
    badge: 'NEW' as const,
  },
  {
    id: 'rv3',
    name: 'Wireless Charging Pad',
    price: 45.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=600&auto=format&fit=crop',
    rating: 4.4,
    reviewCount: 156,
  },
  {
    id: 'rv4',
    name: 'Ceramic Coffee Mug',
    price: 24.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 88,
  },
  {
    id: 'rv5',
    name: 'Bluetooth Trackpad',
    price: 129.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d715b909?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 22,
  },
];

export default function RecentlyViewedSlider() {
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="border-t border-[#E8E8E8] py-12 lg:py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0D0D0D]">
              Recently Viewed
            </h2>
            <p className="text-[13px] text-[#9A9A9A] mt-1">
              Continue where you left off
            </p>
          </div>

          {/* Custom Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-9 h-9 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#4B4B4B] transition-all duration-200 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-9 h-9 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#4B4B4B] transition-all duration-200 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, A11y]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={4}
            loop={false}
            grabCursor={true}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="!overflow-visible"
          >
            {RECENTLY_VIEWED.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
