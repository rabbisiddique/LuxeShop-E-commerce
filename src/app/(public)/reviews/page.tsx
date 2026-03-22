'use client';

import React from 'react';
import { Star, MessageSquare, ThumbsUp, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import ReviewCard from '@/src/components/reviews/ReviewCard';
import RatingHistogram from '@/src/components/reviews/RatingHistogram';

export default function AllReviewsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-20 pt-16">
      {/* Header */}
      <section className="bg-white border-b border-[#E8E8E8] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-[1.5px] block mb-3">
            What our customers say
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[#0D0D0D] mb-6">
            Customer Reviews
          </h1>
          <p className="text-[#4B4B4B] text-lg max-w-2xl mx-auto">
            Real feedback from real customers. We pride ourselves on quality and service, 
            and our community&apos;s voice is at the heart of everything we do.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar: Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-[100px]">
              <RatingHistogram />
              
              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white border border-[#E8E8E8] p-4 rounded-xl flex flex-col items-center text-center gap-2">
                  <ShieldCheck size={24} className="text-[#16A34A]" />
                  <span className="text-[11px] font-bold text-[#0D0D0D] uppercase">100% Verified</span>
                </div>
                <div className="bg-white border border-[#E8E8E8] p-4 rounded-xl flex flex-col items-center text-center gap-2">
                  <Award size={24} className="text-[#FF6B35]" />
                  <span className="text-[11px] font-bold text-[#0D0D0D] uppercase">Top Rated</span>
                </div>
              </div>

              {/* Stats Card */}
              <div className="mt-6 bg-[#0D0D0D] text-white p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MessageSquare size={20} className="text-[#FF6B35]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Total Feedback</h4>
                    <p className="text-xs text-white/60">Across all products</p>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">12,482</div>
                <div className="flex items-center gap-2 text-[11px] text-[#16A34A] font-bold">
                  <ThumbsUp size={12} />
                  <span>98% Positive Sentiment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main: Review List */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-[#0D0D0D]">Latest Reviews</h3>
              <div className="flex items-center gap-4">
                <select className="bg-transparent border-none text-sm font-semibold text-[#4B4B4B] outline-none cursor-pointer focus:text-[#FF6B35]">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                  <option>Most Helpful</option>
                </select>
              </div>
            </div>

            <ReviewCard />
            
            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3, '...', 12].map((page, i) => (
                <button 
                  key={i}
                  className={`w-10 h-10 rounded-lg border text-sm font-bold transition-all ${
                    page === 1 
                      ? "bg-[#0D0D0D] border-[#0D0D0D] text-white" 
                      : "bg-white border-[#E8E8E8] text-[#4B4B4B] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
