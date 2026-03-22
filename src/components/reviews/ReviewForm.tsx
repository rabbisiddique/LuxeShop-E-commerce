'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { 
  Star, 
  X, 
  ShieldCheck, 
  ThumbsUp, 
  ThumbsDown, 
  ImagePlus, 
  Send, 
  Sparkles,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    image: string;
    purchaseDate: string;
  };
}

export default function ReviewForm({ isOpen, onClose, product }: ReviewFormProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const ratingLabels: Record<number, { label: string; color: string }> = {
    1: { label: 'Terrible', color: 'text-red-500' },
    2: { label: 'Poor', color: 'text-orange-500' },
    3: { label: 'Average', color: 'text-yellow-500' },
    4: { label: 'Good', color: 'text-blue-500' },
    5: { label: 'Excellent! 🎉', color: 'text-green-500' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
      />

      {/* Modal Panel */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative bg-white rounded-[20px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-[0_24px_64px_rgba(0,0,0,0.14)] custom-scrollbar"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-7 py-6 sm:py-5 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#FFF0EB] flex items-center justify-center mr-3">
              <Star size={20} className="text-[#FF6B35] fill-[#FF6B35]" />
            </div>
            <h2 className="font-['Playfair_Display'] text-[20px] font-semibold text-[#0D0D0D]">
              Write a Review
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#E8E8E8] flex items-center justify-center text-[#4B4B4B] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {step === 'form' ? (
          <>
            {/* Product Context Strip */}
            <div className="px-7 py-4 border-b border-[#E8E8E8] bg-[#FAFAFA] flex items-center gap-3">
              <div className="relative w-[52px] h-[52px] rounded-lg bg-[#F5F5F5] border border-[#E8E8E8] overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-[#0D0D0D] truncate">
                  {product.name}
                </h3>
                <p className="text-[12px] text-[#9A9A9A] mt-0.5">
                  Purchased {product.purchaseDate}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ShieldCheck size={12} className="text-[#16A34A]" />
                  <span className="text-[11px] font-medium text-[#16A34A]">Verified Purchase</span>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-7 flex flex-col gap-6">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-[12px] font-bold text-[#0D0D0D] uppercase tracking-wider mb-3">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="relative transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star 
                        size={36} 
                        className={`
                          transition-colors duration-150
                          ${(hoverRating || rating) >= star 
                            ? 'text-[#FF6B35] fill-[#FF6B35]' 
                            : 'text-[#E8E8E8]'}
                        `}
                      />
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {rating > 0 && (
                    <motion.p 
                      key={rating}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className={`text-[14px] font-medium mt-2 ${ratingLabels[rating].color}`}
                    >
                      {ratingLabels[rating].label}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-[12px] font-bold text-[#0D0D0D] uppercase tracking-wider mb-2">
                  Review Title *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Summarize your experience"
                  className="w-full h-11 px-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg text-[14px] focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 outline-none transition-all"
                  maxLength={80}
                />
                <div className="flex justify-end mt-1.5">
                  <span className="text-[11px] text-[#9A9A9A]">0 / 80</span>
                </div>
              </div>

              {/* Review Body */}
              <div>
                <label className="block text-[12px] font-bold text-[#0D0D0D] uppercase tracking-wider mb-2">
                  Your Review *
                </label>
                <div className="relative">
                  <textarea 
                    required
                    placeholder="Tell others what you think about this product. What did you love? What could be better?"
                    className="w-full h-[120px] p-3.5 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg text-[14px] focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 outline-none transition-all resize-none"
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 text-[11px] text-[#9A9A9A]">
                    0 / 500
                  </div>
                </div>
              </div>

              {/* Pros / Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#16A34A] uppercase tracking-wider mb-2">
                    <ThumbsUp size={12} />
                    What did you like?
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Great sound quality"
                    className="w-full h-11 px-4 bg-[#FAFAFA] border border-[#16A34A]/30 rounded-lg text-[14px] focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#DC2626]/70 uppercase tracking-wider mb-2">
                    <ThumbsDown size={12} />
                    What could improve?
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. A bit pricey"
                    className="w-full h-11 px-4 bg-[#FAFAFA] border border-[#DC2626]/20 rounded-lg text-[14px] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-[12px] font-bold text-[#0D0D0D] uppercase tracking-wider mb-2.5">
                  Add Photos (Optional)
                </label>
                <div className="group border-2 border-dashed border-[#E8E8E8] rounded-xl p-5 bg-[#FAFAFA] hover:border-[#FF6B35] hover:bg-[#FFF0EB]/30 cursor-pointer transition-all flex flex-col items-center gap-2">
                  <ImagePlus size={28} className="text-[#9A9A9A] group-hover:text-[#FF6B35] transition-colors" />
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-[#4B4B4B]">Drop photos here or click to upload</p>
                    <p className="text-[11px] text-[#9A9A9A] mt-0.5">JPG, PNG up to 5MB each</p>
                  </div>
                </div>
                
                {/* Previews */}
                <div className="flex gap-2 mt-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="relative w-[72px] h-[72px] rounded-lg border border-[#E8E8E8] overflow-hidden">
                      <Image 
                        src={`https://picsum.photos/seed/review-${i}/100/100`} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                      />
                      <button className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/50 hover:bg-[#DC2626] flex items-center justify-center transition-colors">
                        <X size={8} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommend Toggle */}
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl">
                <div className="flex items-center gap-2.5">
                  <ThumbsUp size={16} className="text-[#9A9A9A]" />
                  <span className="text-[14px] text-[#1F1F1F]">Would you recommend this product?</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setRecommend(!recommend)}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${recommend ? 'bg-[#FF6B35]' : 'bg-[#E8E8E8]'}`}
                >
                  <motion.div 
                    animate={{ x: recommend ? 22 : 2 }}
                    className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-7 py-5 border-t border-[#E8E8E8] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-[#9A9A9A]">
                <ShieldCheck size={11} />
                <span>Your review will be public</span>
              </div>
              <div className="flex gap-2.5">
                <button 
                  onClick={onClose}
                  className="h-11 px-5 border border-[#E8E8E8] rounded-lg text-[14px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="h-11 px-6 bg-[#FF6B35] text-white rounded-lg text-[14px] font-semibold flex items-center gap-2 shadow-[0_4px_14px_rgba(255,107,53,0.35)] hover:bg-[#E55A25] active:scale-[0.98] transition-all"
                >
                  <Send size={15} />
                  Submit Review
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#16A34A] to-[#22C55E] flex items-center justify-center shadow-[0_8px_24px_rgba(22,163,74,0.3)]">
                <Check size={36} className="text-white" />
              </div>
              
              {/* Confetti Dots */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: ['#FF6B35', '#16A34A', '#2563EB', '#D97706'][i % 4] 
                  }}
                />
              ))}
            </motion.div>

            <h3 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D] mt-5">
              Review Submitted! 🎉
            </h3>
            <p className="text-[14px] text-[#9A9A9A] mt-2 max-w-[320px]">
              Thank you for sharing your experience. Your review helps other shoppers.
            </p>

            <div className="mt-5 px-5 py-3 bg-[#FFF0EB] border border-[#FFD4C2] rounded-xl flex items-center gap-2">
              <Sparkles size={16} className="text-[#FF6B35]" />
              <span className="text-[14px] font-semibold text-[#FF6B35]">
                You earned 50 loyalty points!
              </span>
            </div>

            <button 
              onClick={onClose}
              className="mt-6 h-[46px] px-8 bg-[#FF6B35] text-white rounded-lg text-[14px] font-semibold shadow-[0_4px_14px_rgba(255,107,53,0.35)] hover:bg-[#E55A25] transition-all"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E8E8E8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FF6B35;
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}
