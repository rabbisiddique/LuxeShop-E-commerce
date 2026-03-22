import React from 'react';
import { Check, Truck, Package, MapPin, Calendar, ExternalLink, Clock } from 'lucide-react';

export default function OrderTimeline() {
  const steps = [
    { id: 1, title: 'Order Placed', time: 'Jan 10, 2:30 PM', desc: 'We have received your order.', status: 'completed' },
    { id: 2, title: 'Confirmed', time: 'Jan 10, 4:15 PM', desc: 'Your order has been confirmed.', status: 'completed' },
    { id: 3, title: 'Shipped', time: 'Jan 11, 9:00 AM', desc: 'Your package is on its way! Estimated delivery: Jan 12, 2025', status: 'active', icon: Truck },
    { id: 4, title: 'Out for Delivery', time: '–', desc: 'Your package is out for delivery.', status: 'upcoming' },
    { id: 5, title: 'Delivered', time: '–', desc: 'Package has been delivered.', status: 'upcoming' },
  ];

  const currentStep = 3;

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-7 sm:p-8">
      <div className="flex items-center justify-between mb-7">
        <h3 className="font-['Playfair_Display'] text-[18px] font-bold text-[#0D0D0D]">Order Status</h3>
        <button className="flex items-center gap-1.5 text-[13px] font-semibold text-[#FF6B35] hover:underline">
          Track Package <ExternalLink size={13} />
        </button>
      </div>

      {/* TIMELINE (vertical) */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[#E8E8E8]">
          <div 
            className="absolute top-0 left-0 w-full bg-[#16A34A] transition-all duration-1000"
            style={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isUpcoming = step.status === 'upcoming';
            const StepIcon = step.icon || Package;

            return (
              <div key={step.id} className={`flex gap-4 relative ${i !== steps.length - 1 ? 'pb-7' : ''}`}>
                {/* Left — Step circle */}
                <div className="relative z-10 shrink-0">
                  {isCompleted && (
                    <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center">
                      <Check size={18} className="text-white" />
                    </div>
                  )}
                  {isActive && (
                    <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center shadow-[0_0_0_4px_rgba(37,99,235,0.2)] animate-pulse">
                      <StepIcon size={18} className="text-white" />
                    </div>
                  )}
                  {isUpcoming && (
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#E8E8E8] flex items-center justify-center">
                      <Clock size={18} className="text-[#E8E8E8]" />
                    </div>
                  )}
                </div>

                {/* Right — Step content */}
                <div className="flex-1 pt-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className={`text-[14px] font-bold ${
                      isCompleted ? 'text-[#16A34A]' : 
                      isActive ? 'text-[#2563EB]' : 
                      'text-[#9A9A9A]'
                    }`}>
                      {step.title}
                    </h4>
                    <span className="text-[12px] text-[#9A9A9A] font-medium">
                      {step.time}
                    </span>
                  </div>

                  <p className="text-[13px] text-[#4B4B4B] mt-1 leading-relaxed">
                    {step.desc}
                  </p>

                  {isActive && (
                    <div className="mt-2 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3.5">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-[#2563EB]">
                        <Truck size={14} />
                        <span>In transit — FedEx</span>
                      </div>
                      <p className="text-[12px] text-[#9A9A9A] mt-1 font-medium">Tracking: FX-283-9471-2200</p>
                      <p className="text-[12px] text-[#9A9A9A] mt-0.5 font-medium">Last update: Chicago, IL</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DELIVERY ESTIMATE BANNER */}
      <div className="mt-6 bg-[#FFF0EB] border border-[#FFD4C2] rounded-[10px] p-4 flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
          <Calendar size={20} className="text-[#FF6B35]" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-wider mb-0.5">Estimated Delivery</div>
          <div className="text-[15px] font-bold text-[#0D0D0D]">Monday, January 12, 2025</div>
        </div>
      </div>
    </div>
  );
}
