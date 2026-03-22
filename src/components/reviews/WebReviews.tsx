'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Star, ExternalLink, Search, Loader2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WebReview {
  source: string;
  title: string;
  rating: number;
  snippet: string;
  url: string;
  date?: string;
}

export default function WebReviews({ productName }: { productName: string }) {
  const [reviews, setReviews] = useState<WebReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWebReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find 3 real-world reviews or expert opinions for the product: "${productName}". 
        Return them as a JSON array of objects with fields: source (e.g. TechRadar, Amazon), title, rating (out of 5), snippet (a short summary), and url.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        },
      });

      const data = JSON.parse(response.text || '[]');
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch web reviews:", err);
      setError("Unable to fetch reviews from the web at this time.");
    } finally {
      setIsLoading(false);
    }
  }, [productName]);

  useEffect(() => {
    if (productName) {
      fetchWebReviews();
    }
  }, [productName, fetchWebReviews]);

  return (
    <div className="mt-12 bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#E8E8E8] flex items-center justify-between bg-[#FAFAFA]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
            <Search size={20} className="text-[#FF6B35]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0D0D0D]">Reviews from the Web</h3>
            <p className="text-xs text-[#9A9A9A]">Powered by Google Search & Gemini AI</p>
          </div>
        </div>
        <button 
          onClick={fetchWebReviews}
          disabled={isLoading}
          className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCcw size={12} />}
          Refresh
        </button>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center gap-4"
            >
              <Loader2 size={32} className="text-[#FF6B35] animate-spin" />
              <p className="text-sm text-[#9A9A9A] font-medium animate-pulse">Searching for real-world reviews...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <p className="text-sm text-[#DC2626]">{error}</p>
              <button 
                onClick={fetchWebReviews}
                className="mt-4 text-xs font-bold text-[#FF6B35] hover:underline"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {reviews.length > 0 ? (
                reviews.map((review, i) => (
                  <div key={i} className="group p-4 rounded-lg border border-transparent hover:border-[#E8E8E8] hover:bg-[#FAFAFA] transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider px-2 py-0.5 bg-[#FFF0EB] rounded">
                          {review.source}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star 
                              key={starIdx} 
                              size={10} 
                              className={starIdx < Math.floor(review.rating) ? "text-[#FF6B35] fill-[#FF6B35]" : "text-[#E8E8E8]"} 
                            />
                          ))}
                        </div>
                      </div>
                      <a 
                        href={review.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#9A9A9A] hover:text-[#FF6B35] transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D] mb-2 group-hover:text-[#FF6B35] transition-colors">
                      {review.title}
                    </h4>
                    <p className="text-[13px] text-[#4B4B4B] leading-relaxed italic">
                      &quot;{review.snippet}&quot;
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <MessageSquare size={32} className="text-[#E8E8E8] mx-auto mb-3" />
                  <p className="text-sm text-[#9A9A9A]">No web reviews found for this product.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RefreshCcw({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
