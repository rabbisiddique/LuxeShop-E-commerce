'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, A11y } from 'swiper/modules';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HERO_SLIDES = [
  {
    id: 1,
    tag: "✦ NEW ARRIVALS 2025",
    heading: { line1: "Discover", line2: "Premium", line3: "Products" },
    sub: "Curated selection of exceptional products. From cutting-edge electronics to timeless fashion.",
    cta1: { text: "Shop Now", link: "/shop" },
    cta2: { text: "View Deals", link: "/shop" },
    accent: "#FF6B35"
  },
  {
    id: 2,
    tag: "✦ TRENDING NOW",
    heading: { line1: "Elevate", line2: "Your Style", line3: "Today" },
    sub: "Fashion-forward pieces for every occasion. Discover the latest trends in luxury apparel.",
    cta1: { text: "Shop Fashion", link: "/category/fashion" },
    cta2: { text: "See Lookbook", link: "/shop" },
    accent: "#FF6B35"
  },
  {
    id: 3,
    tag: "✦ FLASH SALE",
    heading: { line1: "Up to", line2: "40% Off", line3: "Today Only" },
    sub: "Limited time deals on premium electronics. Don't miss out on our biggest sale of the season.",
    cta1: { text: "Shop Deals", link: "/shop" },
    cta2: { text: "Set Reminder", link: "/shop" },
    accent: "#FF6B35"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => setShowSwipeHint(false), 2000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[700px] bg-[#0D0D0D] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6B35]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* DESKTOP LAYOUT */}
      {!isMobile && (
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 gap-12 items-center min-h-[700px] py-20 relative z-10">
          {/* Left Content */}
          <div className="flex flex-col items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-content-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] text-[11px] font-semibold uppercase tracking-[1.2px] mb-6">
                  {activeSlideData.tag}
                </div>

                <h1 className="font-['Playfair_Display'] text-7xl font-bold text-white leading-[1.1] tracking-[-1.5px] mb-6">
                  {activeSlideData.heading.line1} <br />
                  <span className="text-[#FF6B35]">{activeSlideData.heading.line2}</span> <br />
                  {activeSlideData.heading.line3}
                </h1>

                <p className="font-['DM_Sans'] text-[#9A9A9A] text-lg max-w-[420px] mb-10 leading-relaxed">
                  {activeSlideData.sub}
                </p>

                <div className="flex items-center gap-4 mb-12">
                  <Link 
                    href={activeSlideData.cta1.link} 
                    className="px-8 py-4 bg-[#FF6B35] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#E55A25] transition-all duration-300 shadow-[0_4px_14px_rgba(255,107,53,0.35)]"
                  >
                    {activeSlideData.cta1.text}
                  </Link>
                  <Link 
                    href={activeSlideData.cta2.link} 
                    className="px-8 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {activeSlideData.cta2.text} <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-[12px] text-[#9A9A9A]">
                  <span className="flex items-center gap-2">✓ Free shipping $100+</span>
                  <span className="flex items-center gap-2">✓ 30-day returns</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Visual */}
          <div className="relative h-[500px] flex items-center justify-center">
            <motion.div
              key={`slide-visual-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[400px] bg-[#1F1F1F] rounded-[16px] border border-white/10 rotate-[-6deg] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-transparent" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[400px] bg-[#1F1F1F] rounded-[16px] border border-white/10 rotate-[6deg] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/10 to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm font-medium shadow-xl"
              >
                50K+ Happy Customers
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 left-10 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm font-medium shadow-xl"
              >
                4.9★ Rating
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop Pagination */}
          <div className="absolute bottom-12 left-8 flex items-center gap-3">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 ${currentSlide === idx ? 'w-6 h-1.5 bg-[#FF6B35] rounded-full' : 'w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/60'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE LAYOUT (Swiper) */}
      {isMobile && (
        <div className="relative h-full">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade, A11y]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'hero-bullet',
              bulletActiveClass: 'hero-bullet-active',
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            className="h-full"
          >
            {HERO_SLIDES.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[500px]">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] text-[10px] font-semibold uppercase tracking-[1px] mb-6">
                      {slide.tag}
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl font-bold text-white leading-[1.2] mb-4">
                      {slide.heading.line1} <br />
                      <span className="text-[#FF6B35]">{slide.heading.line2}</span> <br />
                      {slide.heading.line3}
                    </h2>

                    <p className="font-['DM_Sans'] text-[#9A9A9A] text-sm max-w-[280px] mx-auto mb-10 leading-relaxed">
                      {slide.sub}
                    </p>

                    <div className="flex flex-col gap-3 w-full max-w-[280px] mx-auto">
                      <Link 
                        href={slide.cta1.link} 
                        className="w-full py-3.5 bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center"
                      >
                        {slide.cta1.text}
                      </Link>
                      <Link 
                        href={slide.cta2.link} 
                        className="w-full py-3.5 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                      >
                        {slide.cta2.text} <ChevronRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swipe Hint */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 z-20"
              >
                <ChevronLeft size={20} className="animate-pulse" />
                <ChevronRight size={20} className="animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>

          <style jsx global>{`
            .swiper-pagination-bullets.swiper-pagination-horizontal {
              bottom: 24px !important;
            }
            .hero-bullet {
              width: 6px;
              height: 6px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 999px;
              cursor: pointer;
              transition: all 300ms ease;
              display: inline-block;
              margin: 0 4px;
            }
            .hero-bullet-active {
              width: 20px;
              height: 6px;
              background: #FF6B35;
              border-radius: 3px;
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
