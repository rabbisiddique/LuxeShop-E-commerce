'use client';

import { useState } from 'react';
import { Zap, Volume2, Wind, ChevronDown, Check, Truck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tabs = ["Description", "Specifications", "In the Box", "Shipping & Returns"];

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("Description");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden mt-8">
      {/* TAB BAR */}
      <div className="flex bg-[#FAFAFA] border-b border-[#E8E8E8] overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-[14px] font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
              activeTab === tab
                ? "text-[#FF6B35] border-[#FF6B35] bg-white font-semibold"
                : "text-[#4B4B4B] border-transparent hover:text-[#0D0D0D] hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === "Description" && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-[16px] text-[#1F1F1F] leading-[1.7] mb-5">
                Experience audio perfection with the SoundMaster Pro headphones. Engineered for those who demand the best, these headphones combine cutting-edge noise cancellation with studio-grade sound quality.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Zap, title: "40-Hour Battery Life", desc: "Keep the music going all week with industry-leading battery performance." },
                  { icon: Volume2, title: "Hi-Res Audio Certified", desc: "Hear every detail with ultra-wide frequency response and crystal clear highs." },
                  { icon: Wind, title: "Active Noise Cancellation", desc: "Block out the world with our advanced triple-mic ANC technology." },
                  ...(isExpanded ? [
                    { icon: Check, title: "Bluetooth 5.3", desc: "Seamless connectivity with multi-point pairing for two devices." },
                    { icon: Check, title: "Premium Comfort", desc: "Memory foam ear cushions designed for all-day listening sessions." }
                  ] : [])
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF0EB] flex items-center justify-center flex-shrink-0">
                      <feature.icon size={20} className="text-[#FF6B35]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#0D0D0D]">{feature.title}</h4>
                      <p className="text-[13px] text-[#4B4B4B] mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-5 text-[13px] font-semibold text-[#FF6B35] flex items-center gap-1 hover:underline"
              >
                {isExpanded ? "Show less" : "+ Show more features"}
                <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
            </motion.div>
          )}

          {activeTab === "Specifications" && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0"
            >
              {[
                ["Driver Size", "40mm Dynamic"],
                ["Frequency", "20Hz – 20kHz"],
                ["Impedance", "32 Ohm"],
                ["Weight", "250g"],
                ["Connectivity", "Bluetooth 5.3"],
                ["Battery", "800mAh Li-ion"],
                ["Charging", "USB-C, 2hr"],
                ["Colors", "4 options"],
              ].map(([label, value], i) => (
                <div key={i} className={`flex justify-between py-3 border-b border-[#E8E8E8] ${i % 2 === 1 ? "bg-[#FAFAFA] -mx-8 px-8" : ""}`}>
                  <span className="text-[13px] font-semibold text-[#4B4B4B]">{label}</span>
                  <span className="text-[13px] text-[#0D0D0D]">{value}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "In the Box" && (
            <motion.div
              key="box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {[
                "1x SoundMaster Pro Headphones",
                "1x USB-C Charging Cable (1.2m)",
                "1x 3.5mm Audio Cable",
                "1x Carrying Case (Hard shell)",
                "1x Quick Start Guide",
                "1x Warranty Card",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={16} className="text-[#16A34A]" />
                  <span className="text-[14px] text-[#1F1F1F]">{item}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "Shipping & Returns" && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Truck size={24} className="text-[#FF6B35]" />
                  <h3 className="text-[16px] font-semibold text-[#0D0D0D]">Delivery Information</h3>
                </div>
                <div className="space-y-2">
                  {[
                    ["Standard (3–5 days)", "Free"],
                    ["Express (1–2 days)", "$9.99"],
                    ["Same Day (Today)", "$19.99"],
                  ].map(([method, price], i) => (
                    <div key={i} className="flex justify-between items-center bg-[#FAFAFA] p-3 px-4 rounded-lg">
                      <span className="text-[13px] font-medium text-[#1F1F1F]">{method}</span>
                      <span className="text-[13px] font-bold text-[#0D0D0D]">{price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <RotateCcw size={24} className="text-[#FF6B35]" />
                  <h3 className="text-[16px] font-semibold text-[#0D0D0D]">Return Policy</h3>
                </div>
                <ul className="text-[13px] text-[#4B4B4B] leading-[1.8] list-disc pl-5">
                  <li>30-day money-back guarantee for all orders.</li>
                  <li>Items must be in original packaging and condition.</li>
                  <li>Free return shipping on all domestic orders.</li>
                  <li>Refunds processed within 5-7 business days.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
