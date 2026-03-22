'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Award, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    initials: "SM",
    color: "#FF6B35",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Absolutely incredible sound quality",
    body: "I've tried many headphones in this price range and nothing comes close. The noise cancellation is impressive, blocking out even the loudest train commute. The battery life actually exceeds the advertised 40 hours in my experience. Highly recommended for anyone who values audio fidelity.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80",
    ],
    helpful: 47,
  },
  {
    id: 2,
    name: "James K.",
    initials: "JK",
    color: "#2563EB",
    rating: 4,
    date: "1 week ago",
    verified: true,
    title: "Great headphones, minor comfort issue",
    body: "Sound is fantastic and battery life is exactly as promised. My only small gripe is that after about 4 hours of continuous use, the headband starts to feel a bit tight. Other than that, they are perfect. The app integration is also very smooth and useful for EQ adjustments.",
    images: [],
    helpful: 23,
  },
  {
    id: 3,
    name: "Priya R.",
    initials: "PR",
    color: "#16A34A",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    isTopReviewer: true,
    title: "Best purchase I've made this year",
    body: "Switched from a more expensive brand and I honestly prefer these. The build quality feels much more premium and the sound profile is more balanced. I love the physical buttons instead of touch controls which can be finicky. The carrying case is also very sturdy and well-designed.",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=200&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&q=80",
    ],
    helpful: 89,
  },
];

export default function ReviewCard() {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedReviews(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-[#E8E8E8] rounded-xl p-6 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
        >
          {/* ROW 1: Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
                style={{ backgroundColor: review.color }}
              >
                {review.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#0D0D0D]">{review.name}</span>
                <span className="text-[12px] text-[#9A9A9A]">{review.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? "text-[#FF6B35] fill-[#FF6B35]" : "text-[#E8E8E8]"}
                  />
                ))}
              </div>
              <span className="text-[13px] font-semibold text-[#0D0D0D] ml-1">{review.rating}</span>
            </div>
          </div>

          {/* ROW 2: Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {review.verified && (
              <div className="flex items-center gap-1 bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-1 rounded-full">
                <ShieldCheck size={12} className="text-[#16A34A]" />
                <span className="text-[11px] font-bold text-[#16A34A]">Verified Purchase</span>
              </div>
            )}
            {review.isTopReviewer && (
              <div className="flex items-center gap-1 bg-[#FFFBEB] border border-[#FDE68A] px-2 py-1 rounded-full">
                <Award size={12} className="text-[#D97706]" />
                <span className="text-[11px] font-bold text-[#D97706]">Top Reviewer</span>
              </div>
            )}
          </div>

          {/* ROW 3: Review Title */}
          <h4 className="text-[15px] font-bold text-[#0D0D0D] mt-3.5">
            {review.title}
          </h4>

          {/* ROW 4: Review Body */}
          <div className="mt-2">
            <p className={`text-[14px] text-[#4B4B4B] leading-[1.7] ${expandedReviews.includes(review.id) ? "" : "line-clamp-3"}`}>
              {review.body}
            </p>
            {review.body.length > 150 && (
              <button
                onClick={() => toggleExpand(review.id)}
                className="text-[13px] font-semibold text-[#FF6B35] mt-1 hover:underline"
              >
                {expandedReviews.includes(review.id) ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          {/* ROW 5: Review Images */}
          {review.images.length > 0 && (
            <div className="flex gap-2 mt-4">
              {review.images.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="relative w-[72px] h-[72px] rounded-lg overflow-hidden border border-[#E8E8E8] bg-[#F5F5F5] group cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`Review ${i}`}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {i === 2 && review.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-[13px] font-bold">+{review.images.length - 2}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ROW 6: Footer */}
          <div className="mt-4 pt-3.5 border-t border-[#F5F5F5] flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-[12px] text-[#9A9A9A] mr-3">Was this helpful?</span>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 bg-[#F5F5F5] border border-[#E8E8E8] px-2.5 py-1 rounded-full text-[12px] text-[#4B4B4B] hover:bg-[#FFF0EB] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all">
                  <ThumbsUp size={14} />
                  {review.helpful}
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-[#F5F5F5] border border-[#E8E8E8] rounded-full text-[#4B4B4B] hover:bg-[#FFF0EB] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all">
                  <ThumbsDown size={14} />
                </button>
              </div>
            </div>

            <button className="flex items-center gap-1 text-[11px] text-[#9A9A9A] hover:text-[#DC2626] transition-colors">
              <Flag size={11} />
              Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
