'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const messages = [
  { text: "🚚 Free shipping on orders over $100 — Shop Now →", link: "/shop" },
  { text: "🎉 New arrivals just dropped — Explore Collection →", link: "/shop" },
  { text: "🔥 Today's deals — Up to 40% off — See Deals →", link: "/shop" }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hidden = localStorage.getItem('announcement-hidden');
    if (hidden === 'true') {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-hidden', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-[40px] bg-[#FF6B35] text-white flex items-center justify-center overflow-hidden px-4">
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.a
            key={currentIndex}
            href={messages[currentIndex].link}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-[13px] font-medium font-['DM_Sans'] text-center hover:opacity-90 transition-opacity"
          >
            <span className="hidden sm:inline">{messages[currentIndex].text}</span>
            <span className="sm:hidden">
              {messages[currentIndex].text.split(' — ')[0]} →
            </span>
          </motion.a>
        </AnimatePresence>
      </div>
      
      <button 
        onClick={handleDismiss}
        className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
