'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Package, 
  Bell, 
  Inbox,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { motion } from 'motion/react';

interface EmptyStateProps {
  type?: 'cart' | 'wishlist' | 'orders' | 'search' | 'notifications' | 'general';
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: LucideIcon;
}

export default function EmptyState({ 
  type = 'general',
  title,
  description,
  actionLabel,
  actionHref = '/products',
  icon: CustomIcon
}: EmptyStateProps) {
  
  const configs = {
    cart: {
      icon: ShoppingBag,
      title: "Your cart is empty",
      description: "Looks like you haven't added anything to your cart yet. Start shopping and find something you love!",
      actionLabel: "Start Shopping"
    },
    wishlist: {
      icon: Heart,
      title: "Your wishlist is empty",
      description: "Save items you love to your wishlist and they'll appear here. It's the perfect place to keep track of your favorites.",
      actionLabel: "Explore Products"
    },
    orders: {
      icon: Package,
      title: "No orders yet",
      description: "You haven't placed any orders with us yet. Once you do, you can track their status here.",
      actionLabel: "Go Shopping"
    },
    search: {
      icon: Search,
      title: "No results found",
      description: "We couldn't find anything matching your search. Try checking your spelling or using more general terms.",
      actionLabel: "View All Products"
    },
    notifications: {
      icon: Bell,
      title: "No notifications",
      description: "You're all caught up! We'll notify you here when there's something new to see.",
      actionLabel: "Back to Home",
      actionHref: "/"
    },
    general: {
      icon: Inbox,
      title: "Nothing here yet",
      description: "This section is currently empty. Check back later or explore other parts of our shop.",
      actionLabel: "Go Home",
      actionHref: "/"
    }
  };

  const config = configs[type];
  const Icon = CustomIcon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionLabel = actionLabel || config.actionLabel;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      {/* Icon Container */}
      <div className="relative mb-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-[140px] h-[140px] rounded-full bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center relative"
        >
          <Icon size={56} className="text-[#E8E8E8]" strokeWidth={1.5} />
          
          {/* Decorative Elements */}
          <motion.div 
            animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-1 -left-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-[#2563EB]/20 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#2563EB]" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Text Content */}
      <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">
        {displayTitle}
      </h2>
      <p className="text-[15px] text-[#4B4B4B] mt-3 leading-relaxed">
        {displayDescription}
      </p>

      {/* Action Button */}
      <div className="mt-8">
        <Link 
          href={actionHref}
          className="inline-flex items-center gap-2 h-12 px-8 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold shadow-[0_4px_14px_rgba(255,107,53,0.35)] hover:bg-[#E55A25] hover:-translate-y-0.5 transition-all"
        >
          {displayActionLabel}
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Secondary Links (Optional) */}
      <div className="mt-6 flex items-center gap-4">
        <button className="text-[13px] font-medium text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">
          Need help?
        </button>
        <div className="w-1 h-1 rounded-full bg-[#E8E8E8]" />
        <button className="text-[13px] font-medium text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">
          View FAQs
        </button>
      </div>
    </div>
  );
}
