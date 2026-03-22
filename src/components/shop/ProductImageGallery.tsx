'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Zoom, A11y, Pagination, FreeMode } from 'swiper/modules';
import { Maximize2, Share2, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const PRODUCT_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', alt: 'Premium Headphones Front' },
  { id: 2, url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop', alt: 'Premium Headphones Side' },
  { id: 3, url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop', alt: 'Premium Headphones Detail' },
  { id: 4, url: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1200&auto=format&fit=crop', alt: 'Premium Headphones Lifestyle' },
  { id: 5, url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop', alt: 'Premium Headphones Box' },
];

interface ProductImageGalleryProps {
  mainImage?: string;
}

export default function ProductImageGallery({ mainImage }: ProductImageGalleryProps) {
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth lens following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const images = mainImage 
    ? [{ id: 0, url: mainImage, alt: 'Main Product Image' }, ...PRODUCT_IMAGES]
    : PRODUCT_IMAGES;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Clamp values to stay within bounds
    const clampedX = Math.max(0, Math.min(x, width));
    const clampedY = Math.max(0, Math.min(y, height));
    
    mouseX.set(clampedX);
    mouseY.set(clampedY);
    
    const xPercent = (clampedX / width) * 100;
    const yPercent = (clampedY / height) * 100;
    setZoomPos({ x: xPercent, y: yPercent });
  };

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-4 h-[640px]">
        {/* Thumbnails (Vertical) */}
        <div className="w-24 h-full flex-shrink-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            slidesPerView={6}
            spaceBetween={12}
            modules={[Thumbs, A11y, FreeMode]}
            watchSlidesProgress={true}
            className="h-full thumb-swiper-vertical"
          >
            {images.map((img, idx) => (
              <SwiperSlide 
                key={img.id} 
                className="!h-24"
                onClick={() => mainSwiper?.slideTo(idx)}
              >
                <div 
                  className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    activeSlide === idx 
                      ? 'border-[#FF6B35] shadow-lg scale-[0.98]' 
                      : 'border-transparent bg-white hover:border-[#FF6B35]/30'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main Image */}
        <div 
          ref={mainImageRef}
          className="flex-1 relative rounded-2xl overflow-hidden border border-[#E8E8E8] bg-white group cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Swiper
            onSwiper={setMainSwiper}
            modules={[Thumbs, Navigation, A11y]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className="h-full main-swiper-desktop"
          >
            {images.map((img) => (
              <SwiperSlide key={img.id} className="overflow-hidden">
                <div className="relative h-full w-full">
                  <motion.div 
                    className="relative h-full w-full"
                    animate={{
                      scale: isHovering ? 2.2 : 1,
                      x: isHovering ? `${(50 - zoomPos.x) * 0.5}%` : 0,
                      y: isHovering ? `${(50 - zoomPos.y) * 0.5}%` : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 25,
                      mass: 0.5
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                      priority
                    />
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Interactive Lens Effect */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                style={{
                  left: lensX,
                  top: lensY,
                  x: '-50%',
                  y: '-50%',
                }}
                className="absolute z-20 pointer-events-none w-32 h-32 border-2 border-white/50 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-[2px] flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full bg-[#FF6B35]/5 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full shadow-glow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlays */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
            <span className="bg-[#FF6B35] text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg shadow-[#FF6B35]/20">
              -30% OFF
            </span>
            <span className="bg-[#0D0D0D] text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg">
              NEW ARRIVAL
            </span>
          </div>

          <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => setIsZoomModalOpen(true)}
              className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center text-[#0D0D0D] hover:bg-[#FF6B35] hover:text-white transition-all transform hover:scale-110"
              title="Fullscreen"
            >
              <Maximize2 size={20} />
            </button>
            <button className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center text-[#0D0D0D] hover:bg-[#FF6B35] hover:text-white transition-all transform hover:scale-110">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center text-[#0D0D0D] hover:bg-[#FF6B35] hover:text-white transition-all transform hover:scale-110">
              <Share2 size={20} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 z-10 bg-white/80 backdrop-blur-md text-[#0D0D0D] text-[12px] font-bold px-4 py-2 rounded-xl border border-white/20 shadow-lg">
            {activeSlide + 1} / {images.length}
          </div>

          {/* Zoom Indicator */}
          {!isHovering && (
            <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[#9A9A9A] text-[11px] font-medium bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-none">
              <ZoomIn size={14} />
              Hover to zoom
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E8E8E8] bg-white">
          <Swiper
            modules={[Pagination, Zoom, A11y]}
            slidesPerView={1}
            spaceBetween={0}
            zoom={true}
            grabCursor={true}
            pagination={{
              clickable: true,
              bulletClass: 'gallery-bullet',
              bulletActiveClass: 'gallery-bullet-active',
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className="h-full"
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <div className="swiper-zoom-container h-full w-full">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#FF6B35] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg">
              -30%
            </span>
          </div>
        </div>

        {/* Mobile Thumbnails */}
        <div className="w-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs, FreeMode]}
            className="thumb-swiper-mobile"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={img.id} className="!w-20">
                <div className={`relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${activeSlide === idx ? 'border-[#FF6B35]' : 'border-transparent bg-white'}`}>
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0D0D0D] z-[100] flex flex-col"
          >
            <div className="h-20 px-6 flex items-center justify-between z-[110]">
            <div className="text-white/60 text-sm font-medium">
              {activeSlide + 1} / {images.length} — {images[activeSlide].alt}
            </div>
            <button 
              onClick={() => setIsZoomModalOpen(false)}
              className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 relative">
            <Swiper
              modules={[Zoom, Navigation, A11y]}
              zoom={true}
              navigation={{
                nextEl: '.zoom-next',
                prevEl: '.zoom-prev',
              }}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              initialSlide={activeSlide}
              className="w-full h-full"
            >
              {images.map((img) => (
                <SwiperSlide key={img.id} className="flex items-center justify-center">
                  <div className="swiper-zoom-container">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={1600}
                      height={1600}
                      className="max-h-[80vh] w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation for Modal */}
              <button className="zoom-prev absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-all z-[110] backdrop-blur-md">
                <ChevronLeft size={28} />
              </button>
              <button className="zoom-next absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-all z-[110] backdrop-blur-md">
                <ChevronRight size={28} />
              </button>
            </Swiper>
          </div>

          {/* Modal Thumbnails */}
          <div className="h-32 px-6 pb-6 flex items-center justify-center gap-3 z-[110]">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveSlide(idx)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeSlide === idx ? 'border-[#FF6B35] scale-110' : 'border-white/10 opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .gallery-bullet {
          width: 8px;
          height: 8px;
          background: #E8E8E8;
          border-radius: 999px;
          cursor: pointer;
          transition: all 300ms ease;
          display: inline-block;
          margin: 0 5px;
        }
        .gallery-bullet-active {
          width: 32px;
          height: 8px;
          background: #FF6B35;
          border-radius: 4px;
        }
        .thumb-swiper-vertical .swiper-slide {
          height: 96px !important;
        }
        .main-swiper-desktop .swiper-slide {
          background: white;
        }
      `}</style>
    </div>
  );
}
