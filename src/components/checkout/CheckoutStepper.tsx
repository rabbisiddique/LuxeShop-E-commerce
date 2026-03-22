'use client';

import { MapPin, Truck, CreditCard, ClipboardList, Check } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Shipping', icon: Truck },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: ClipboardList },
];

export default function CheckoutStepper() {
  const currentStep = 3;

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:px-8 mb-8 shadow-sm">
      <div className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isUpcoming = step.id > currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className={`flex items-center ${!isLast ? 'flex-1' : ''}`}>
              {/* Step Circle & Label */}
              <div className="flex flex-col items-center relative z-10">
                <motion.div
                  whileHover={isCompleted ? { scale: 1.05 } : {}}
                  className={`w-9 sm:w-11 h-9 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#16A34A] text-white cursor-pointer'
                      : isActive
                      ? 'bg-[#FF6B35] text-white border-[3px] border-[#FF6B35] shadow-[0_0_0_4px_rgba(255,107,53,0.2)]'
                      : 'bg-white border-2 border-[#E8E8E8] text-[#9A9A9A]'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} className={isActive ? 'text-white' : 'text-[#9A9A9A]'} />
                  )}
                  
                  {isActive && (
                    <motion.div
                      animate={{
                        boxShadow: ['0 0 0 0px rgba(255,107,53,0.4)', '0 0 0 8px rgba(255,107,53,0)'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 rounded-full"
                    />
                  )}
                </motion.div>

                {/* Labels (Desktop Only) */}
                <div className="hidden sm:flex flex-col items-center mt-2">
                  <span
                    className={`text-[12px] text-center transition-colors duration-300 ${
                      isCompleted ? 'font-medium text-[#16A34A]' : isActive ? 'font-semibold text-[#FF6B35]' : 'font-normal text-[#9A9A9A]'
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-[#9A9A9A] mt-0.5">Step {step.id} of 4</span>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 h-[2px] bg-[#E8E8E8] mx-2 sm:mx-4 relative -mt-5 sm:-mt-10">
                  {isCompleted && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-[#16A34A]"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Text */}
      <div className="sm:hidden text-center mt-4">
        <span className="text-[12px] font-semibold text-[#FF6B35]">
          Step 3 of 4: Payment
        </span>
      </div>
    </div>
  );
}
