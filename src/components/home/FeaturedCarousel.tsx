'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/src/components/shop/ProductCard';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    comparePrice: 399.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 124,
    badge: 'SALE' as const,
  },
  {
    id: '2',
    name: 'Minimalist Leather Watch',
    price: 189.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    reviewCount: 86,
    badge: 'NEW' as const,
  },
  {
    id: '3',
    name: 'Smart Home Speaker',
    price: 159.99,
    comparePrice: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 210,
    badge: 'FEATURED' as const,
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 450.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 56,
  },
  {
    id: '5',
    name: 'Professional DSLR Camera',
    price: 1299.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 42,
    badge: 'BEST SELLER' as const,
  },
];

export default function FeaturedCarousel() {
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="bg-[#FAFAFA] py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-[0.8px] block mb-2">
                HANDPICKED FOR YOU
              </span>
              <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
                Featured Products
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E8E8E8] aspect-[3/4] animate-pulse">
                <div className="aspect-square bg-[#F5F5F5]" />
                <div className="p-4 space-y-3">
                  <div className="h-3 w-20 bg-[#F5F5F5] rounded" />
                  <div className="h-4 w-full bg-[#F5F5F5] rounded" />
                  <div className="h-4 w-24 bg-[#F5F5F5] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAFAFA] py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-[0.8px] block mb-2">
              HANDPICKED FOR YOU
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
              Featured Products
            </h2>
          </div>

          {/* Custom Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#4B4B4B] transition-all duration-200 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#4B4B4B] transition-all duration-200 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="relative pb-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'featured-bullet',
              bulletActiveClass: 'featured-bullet-active',
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="!overflow-visible"
          >
            {FEATURED_PRODUCTS.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Styles */}
          <style jsx global>{`
            .swiper-pagination {
              bottom: 0 !important;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 8px;
            }
            .featured-bullet {
              width: 6px;
              height: 6px;
              background: #E8E8E8;
              border-radius: 999px;
              cursor: pointer;
              transition: all 300ms ease;
              display: block;
            }
            .featured-bullet-active {
              width: 24px;
              height: 6px;
              background: #FF6B35;
              border-radius: 3px;
            }
          `}</style>
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="px-8 py-3 border border-[#0D0D0D] text-[#0D0D0D] text-sm font-semibold rounded-lg hover:bg-[#0D0D0D] hover:text-white transition-all duration-300"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
