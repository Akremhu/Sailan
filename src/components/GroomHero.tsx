import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { WeddingProfile } from '../types';
import { soundManager } from '../utils/audio';

import groomLuxuryMinimal from '../assets/images/groom_luxury_minimalist_1790081331430.jpg';

interface GroomHeroProps {
  profile: WeddingProfile;
}

export const GroomHero: React.FC<GroomHeroProps> = ({ profile }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.googleMapsQuery)}`;

  const handleAddToCalendar = () => {
    soundManager.playChimeTone();
    const eventTitle = encodeURIComponent(`${profile.familyTitle} | زفاف ${profile.groomFullName}`);
    const details = encodeURIComponent(`${profile.hostStatement} ${profile.groomFullName}. المناسبة: ${profile.occasionName} في ${profile.venueName}.`);
    const location = encodeURIComponent(`${profile.venueName}, ${profile.venueCity}`);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${details}&location=${location}&dates=20260915T130000Z/20260915T210000Z`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <section id="groom-hero-section" className="relative w-full max-w-2xl mx-auto px-3 sm:px-6 pt-2 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden shadow-sm border border-[#D4AF37]/35 bg-[#FAF8F5] text-[#2C241E]"
      >
        <div className="relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-white">
          <img
            src={groomLuxuryMinimal}
            alt="إطلالة الفخامة الملكية"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF8F5]/60 to-[#FAF8F5]"></div>

          <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none">
            <h1 className="font-amiri text-4xl sm:text-6xl font-bold text-[#2C241E] drop-shadow-xs">
              دعـــــوة زفــــاف
            </h1>
            <span className="font-garamond text-xs sm:text-sm tracking-[0.25em] text-[#8C6D38] font-semibold block mt-1 uppercase">
              WEDDING INVITATION
            </span>
          </div>
        </div>

        <div className="max-w-md mx-auto py-3 px-6 text-center">
          <div className="flex items-center justify-center gap-6 my-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 cursor-pointer"
              title="موقع القاعة في خرائط Google"
            >
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/30 flex items-center justify-center text-[#7D5F23] group-hover:scale-105 group-hover:bg-[#0F382A] group-hover:text-white transition-all shadow-2xs">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-plex text-[#54463A]">الموقع</span>
            </a>

            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

            <button
              onClick={handleAddToCalendar}
              className="group flex flex-col items-center gap-1 cursor-pointer"
              title="إضافة الموعد للتقويم"
            >
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/30 flex items-center justify-center text-[#7D5F23] group-hover:scale-105 group-hover:bg-[#8C6D38] group-hover:text-white transition-all shadow-2xs">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-xs font-plex text-[#54463A]">التقويم</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
            <span className="text-[#8C6D38] text-xs font-mono tracking-widest">𐩱𐩫𐩧𐩣</span>
            <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
          </div>

          <div className="my-5 p-5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/25 text-center">
            <div className="text-xs font-plex text-[#8C6D38] mb-2 flex items-center justify-center gap-1.5">
              <span>✦</span>
              <span>ترحيب وإكرام الأهل</span>
              <span>✦</span>
            </div>
            <div className="space-y-2 font-amiri font-normal text-xl sm:text-2xl text-[#2C241E] leading-[2.1]">
              <p className="text-[#7D5F23] font-bold">«يا مرحبا ترحيب ينشر بالهبوب»</p>
              <p>«يملأ الفضاء ما بين مشرق والغروب»</p>
              <p>«بأهل الوفاء ذي شرفوا أصل القلوب»</p>
              <p className="text-[#7D5F23] font-bold">«في عرس من حبه ملا كل الدروب»</p>
            </div>
          </div>

          <div className="space-y-3 my-6">
            <p className="font-amiri text-lg sm:text-xl text-[#54463A] leading-relaxed">
              {profile.hostStatement}
            </p>

            <div className="py-2">
              <h2 className="font-amiri font-bold text-[#2C241E] leading-tight">
                <span className="text-[44px] sm:text-[56px] text-[#2C241E]">أكــــرم</span>{' '}
                <span className="text-[38px] sm:text-[48px] text-[#4A3B2C]">ســـيلان</span>
              </h2>
              <div className="font-amiri text-xl font-bold text-[#0F382A] mt-1">
                {profile.groomFullName}
              </div>
            </div>

            <div className="inline-block w-full p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-2xs text-center space-y-1 font-plex">
              <div className="font-amiri font-bold text-xl text-[#0F382A]">
                {profile.occasionName}
              </div>
              <div className="font-semibold text-sm sm:text-base text-[#2C241E]">
                {profile.dateTimeBadge}
              </div>
              <div className="text-xs sm:text-sm text-[#6D5222] font-medium">
                {profile.timeBadge}
              </div>
            </div>

            <div className="pt-3">
              <p className="font-amiri text-2xl sm:text-3xl text-[#8C6D38] font-bold">
                «وبحضوركم يتم لنا الفرح والسرور»
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
