import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { CountdownTime } from '../types';

export const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'يوم', value: timeLeft.days, symbol: '𐩺' },
    { label: 'ساعة', value: timeLeft.hours, symbol: '𐩪' },
    { label: 'دقيقة', value: timeLeft.minutes, symbol: '𐩵' },
    { label: 'ثانية', value: timeLeft.seconds, symbol: '𐩻' },
  ];

  return (
    <div id="countdown-section" className="w-full max-w-2xl mx-auto my-8 px-4">
      {/* Decorative Title Banner */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="h-px bg-gradient-to-l from-transparent to-[#D4AF37] w-12" />
        <div className="flex items-center gap-2 text-[#8C6D38] px-3.5 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/30 shadow-2xs">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-amiri text-lg sm:text-xl font-bold">موعد الفرح والبهجة المباركة</span>
        </div>
        <span className="h-px bg-gradient-to-r from-transparent to-[#D4AF37] w-12" />
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#D4AF37]/35 shadow-2xs transition-all"
          >
            <span className="absolute top-1 right-1.5 text-[10px] text-[#C5A059]/60 font-mono select-none">
              {unit.symbol}
            </span>

            <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] font-plex tracking-tight">
              {unit.value.toString().padStart(2, '0')}
            </div>

            <div className="text-xs sm:text-sm font-medium text-[#8C6D38] font-plex mt-1 border-t border-[#D4AF37]/20 pt-1">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm text-[#0F382A] font-plex font-medium flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>موعدنا بمشيئة الله: الثلاثاء 15 / 9 / 2026 م | ابتداءً من الساعة 4:00 عصراً</span>
        </p>
      </div>
    </div>
  );
};
