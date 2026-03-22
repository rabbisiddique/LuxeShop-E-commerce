'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, ShieldCheck, Truck, RefreshCcw, Star } from 'lucide-react';
import { motion } from 'motion/react';
import CategoryGrid from '@/src/components/home/CategoryGrid';
import DealOfTheDay from '@/src/components/home/DealOfTheDay';
import ProductGrid from '@/src/components/shop/ProductGrid';
import HeroBanner from '@/src/components/home/HeroBanner';
import FeaturedCarousel from '@/src/components/home/FeaturedCarousel';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroBanner />

      {/* Features Bar */}
      <section className="bg-[#F5F5F5] py-10 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over $100" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transactions" },
            { icon: RefreshCcw, title: "Easy Returns", desc: "30-day money back guarantee" },
            { icon: Zap, title: "Fast Delivery", desc: "24-hour dispatch on all items" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF6B35] shadow-sm">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0D0D0D]">{feature.title}</h4>
                <p className="text-[12px] text-[#9A9A9A]">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <CategoryGrid />

      {/* Deal of the Day */}
      <DealOfTheDay />

      {/* Featured Products Carousel */}
      <FeaturedCarousel />

      {/* Testimonials Section */}
      <section className="bg-[#FAFAFA] py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-[1.5px] block mb-3">
              COMMUNITY VOICE
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
              Customer Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Verified Buyer",
                text: "The sound quality on these headphones is absolutely mind-blowing. I've tried many brands, but LuxeShop's curated selection is on another level.",
                rating: 5,
                image: "https://picsum.photos/seed/sarah/100/100"
              },
              {
                name: "Michael Chen",
                role: "Tech Enthusiast",
                text: "Fast shipping and excellent customer support. The smart watch I ordered exceeded my expectations in both design and functionality.",
                rating: 5,
                image: "https://picsum.photos/seed/michael/100/100"
              },
              {
                name: "Elena Rodriguez",
                role: "Fashion Blogger",
                text: "I love the unique pieces I find here. The quality of the leather jacket I bought is premium, and the fit is perfect. Highly recommend!",
                rating: 5,
                image: "https://picsum.photos/seed/elena/100/100"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-[#E8E8E8] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIdx) => (
                    <Star key={starIdx} size={14} className="text-[#FF6B35] fill-[#FF6B35]" />
                  ))}
                </div>
                <p className="text-[15px] text-[#4B4B4B] leading-relaxed mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFF0EB]">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0D0D0D]">{testimonial.name}</h4>
                    <span className="text-[12px] text-[#9A9A9A]">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/reviews" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B35] hover:underline"
            >
              Read All 2,800+ Reviews <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-semibold text-[#FF6B35] uppercase tracking-[1.2px] block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
              All Products
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-[#FF6B35] hover:underline flex items-center gap-1">
            View All Products →
          </Link>
        </div>
        
        <ProductGrid />
      </section>
    </div>
  );
}
