'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimerBox = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-[#2A2A2A] rounded-lg p-3 min-w-[64px] transition-all duration-300">
      <span className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] text-[#9A9A9A] font-bold uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <TimerBox value={timeLeft.hours} label="Hours" />
      <span className="text-[#FF6B35] font-bold text-xl">:</span>
      <TimerBox value={timeLeft.minutes} label="Mins" />
      <span className="text-[#FF6B35] font-bold text-xl">:</span>
      <TimerBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
