import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Users, 
  Coffee, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Share2, 
  PhoneCall, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { SAYLAN_WEDDING_PROFILE } from '../data/weddingProfiles';
import { soundManager } from '../utils/audio';

// Images
import quranImg from '../assets/images/quran_luxury_setting_1790085679565.jpg';
import groomLuxuryImg from '../assets/images/groom_akram_saylan_1790344163840.jpg';
import palaceBg from '../assets/images/yemeni_palace_bg_1789998584018.jpg';
import janbiyaImg from '../assets/images/yemeni_janbiya_shawl_1790085696199.jpg';

interface RoyalStoryBookProps {
  targetDate: Date;
}

export const RoyalStoryBook: React.FC<RoyalStoryBookProps> = ({ targetDate }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isGridMode, setIsGridMode] = useState(false);
  const profile = SAYLAN_WEDDING_PROFILE;

  // Countdown Calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('قاعة بيت سيلان الخيرية صنعاء اليمن')}`;

  const handleNext = () => {
    if (activeCardIndex < 8) {
      soundManager.playClickTone();
      setActiveCardIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeCardIndex > 0) {
      soundManager.playClickTone();
      setActiveCardIndex(prev => prev - 1);
    }
  };

  const jumpTo = (idx: number) => {
    soundManager.playClickTone();
    setActiveCardIndex(idx);
    setIsGridMode(false);
  };

  const handleAddToCalendar = () => {
    soundManager.playChimeTone();
    const title = encodeURIComponent(`أفراح آل سيلان | زفاف ${profile.groomFullName}`);
    const details = encodeURIComponent(`${profile.hostStatement} ${profile.groomFullName}. المناسبة: ${profile.occasionName} في ${profile.venueName}.`);
    const location = encodeURIComponent(`${profile.venueName}، ${profile.venueCity}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260915T130000Z/20260915T210000Z`;
    window.open(url, '_blank');
  };

  // Section card definitions
  const sectionCards = [
    { title: 'البسملة والافتتاح', subtitle: 'صنعاء القديمة' },
    { title: 'الآية الكريمة', subtitle: 'ومن آياته' },
    { title: 'أبيات الترحيب', subtitle: 'يا مرحبا ترحيب' },
    { title: 'بطاقة الدعوة الرسمية', subtitle: 'الدكتور أكرم سيلان' },
    { title: 'العداد التنازلي', subtitle: 'تبقى على زفافنا' },
    { title: 'فعاليات الزفاف', subtitle: 'المقيل والزفة' },
    { title: 'موقع القاعة والخرائط', subtitle: 'قاعة بيت سيلان' },
    { title: 'شكر وامتنان', subtitle: 'وفي الختام' },
    { title: 'مباركة ودعاء', subtitle: 'بارك الله لك' },
  ];

  return (
    <section id="royal-storybook-section" className="w-full max-w-md mx-auto px-3 sm:px-4 py-4 select-none">
      
      {/* Top Header Mode Switcher / Breadcrumbs */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-ruqaa text-sm font-bold text-[#8A6721]">
            أفراح آل سيلان
          </span>
        </div>

        {/* View Switcher: Card View vs All Sections Grid */}
        <button
          onClick={() => {
            soundManager.playClickTone();
            setIsGridMode(!isGridMode);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/50 text-xs font-cairo font-bold text-[#6D5222] shadow-xs hover:bg-[#F4E9D0] transition-colors"
        >
          <span>{isGridMode ? 'عرض البطاقات الفردية' : 'عرض كافة الأقسام (٩ بطاقات)'}</span>
        </button>
      </div>

      {/* =========================================================================
          MODE 1: ALL 9 SECTIONS GRID (عرض كافة الأقسام مرتبة كما بالصورة المرفقة)
          ========================================================================= */}
      {isGridMode ? (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <span className="text-xs font-cairo font-bold text-[#8A6721] bg-[#FAF5EB] px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
              أقسام الدعوة بالترتيب الكامل (١ إلى ٩)
            </span>
          </div>

          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
            <div 
              key={index}
              onClick={() => jumpTo(index)}
              className="cursor-pointer group hover:scale-[1.01] transition-transform"
            >
              <div className="text-left text-[11px] font-mono text-[#8A6721] mb-1 px-2 flex justify-between">
                <span>{sectionCards[index].title}</span>
                <span>{index + 1} / 9</span>
              </div>
              <RenderSingleCard 
                index={index} 
                profile={profile} 
                timeLeft={timeLeft} 
                googleMapsUrl={googleMapsUrl}
                handleAddToCalendar={handleAddToCalendar}
              />
            </div>
          ))}
        </div>
      ) : (
        /* =========================================================================
           MODE 2: INTERACTIVE SLIDER / CARD FLIP (عرض الأقسام بطاقة تلو الأخرى)
           ========================================================================= */
        <div>
          {/* Main Displayed Card Frame */}
          <div className="relative min-h-[580px] sm:min-h-[620px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-2 border-[#D4AF37]/70 bg-[#FAF8F5]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCardIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full h-full min-h-[580px] sm:min-h-[620px] flex flex-col justify-between"
              >
                <RenderSingleCard 
                  index={activeCardIndex} 
                  profile={profile} 
                  timeLeft={timeLeft} 
                  googleMapsUrl={googleMapsUrl}
                  handleAddToCalendar={handleAddToCalendar}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Bar (Next / Prev / Page Count) */}
          <div className="mt-5 p-2 rounded-2xl bg-[#FAF5EB] border border-[#D4AF37]/40 shadow-xs flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={activeCardIndex === 0}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl font-cairo text-xs font-bold transition-all ${
                activeCardIndex === 0 
                  ? 'opacity-40 cursor-not-allowed text-neutral-400' 
                  : 'bg-[#FAF6F0] hover:bg-[#F4E9D0] text-[#6D5222] border border-[#D4AF37]/40'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {/* Current Page Indicators / Dots */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
                  <button
                    key={idx}
                    onClick={() => jumpTo(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeCardIndex 
                        ? 'w-5 bg-[#0F382A]' 
                        : 'w-1.5 bg-[#D4AF37]/40 hover:bg-[#D4AF37]'
                    }`}
                    title={sectionCards[idx].title}
                  />
                ))}
              </div>
              <span className="text-[11px] font-cairo font-bold text-[#8A6721]">
                {sectionCards[activeCardIndex].title} ({activeCardIndex + 1} / 9)
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={activeCardIndex === 8}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl font-cairo text-xs font-bold transition-all ${
                activeCardIndex === 8 
                  ? 'opacity-40 cursor-not-allowed text-neutral-400' 
                  : 'bg-gradient-to-r from-[#0F382A] to-[#1E4D3B] text-[#FAF5EB] shadow-xs hover:from-[#144A38] hover:to-[#265B47]'
              }`}
            >
              <span>التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

// =========================================================================
// SUB-COMPONENT: RENDER A SINGLE SECTION CARD (مطابقة لأقسام الصورة التسعة)
// =========================================================================

interface RenderSingleCardProps {
  index: number;
  profile: typeof SAYLAN_WEDDING_PROFILE;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  googleMapsUrl: string;
  handleAddToCalendar: () => void;
}

const RenderSingleCard: React.FC<RenderSingleCardProps> = ({
  index,
  profile,
  timeLeft,
  googleMapsUrl,
  handleAddToCalendar,
}) => {
  switch (index) {
    // -------------------------------------------------------------
    // CARD 1: الافتتاحية والبسملة مع منظر صنعاء التراثية والتاج المعماري
    // -------------------------------------------------------------
    case 0:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          {/* Arch framing */}
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />
          
          {/* Top Sabaean / Islamic Emblem */}
          <div className="pt-4 z-10">
            <div className="w-8 h-8 mx-auto mb-2 text-[#8A6721] opacity-80 flex items-center justify-center">
              ✦ 𐩱𐩫𐩧𐩣 ✦
            </div>
            <div className="inline-block px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/40 text-xs font-cairo font-bold text-[#8A6721]">
              أفراح آل سيلان
            </div>
          </div>

          {/* Central Basmala in Arch Frame (كما بالصورة 1) */}
          <div className="my-auto z-10 py-6 px-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#FFFDF9] border border-[#D4AF37]/60 shadow-[0_8px_30px_rgba(212,175,55,0.1)]">
              <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-[#2C241E] leading-loose drop-shadow-xs">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </h2>
              <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto my-3" />
              <p className="font-ruqaa text-lg text-[#8A6721]">
                دعوة زفاف مباركة
              </p>
            </div>
          </div>

          {/* Bottom Historical Sana'a Towers & Landscape (صورة التراث الصنعاني) */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-4 z-10 border border-[#D4AF37]/30">
            <img 
              src={palaceBg} 
              alt="صنعاء القديمة" 
              className="w-full h-full object-cover object-center brightness-95" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F382A]/90 via-transparent to-transparent flex items-end justify-center pb-3">
              <span className="text-[11px] font-cairo text-[#FAF5EB] font-bold">
                أصالة التراث وعراقة النسب
              </span>
            </div>
          </div>

          {/* Page index indicator */}
          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            1 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 2: الآية القرآنية الكريمة (سورة الروم) مع المصحف الشريف والياسمين
    // -------------------------------------------------------------
    case 1:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Top Ornamental Header */}
          <div className="pt-4 z-10">
            <span className="text-xs font-cairo font-bold text-[#8A6721] tracking-wider">
              ✦ قال تعالى ✦
            </span>
          </div>

          {/* Quranic Verse (سورة الروم 21 - كما بالصورة 2) */}
          <div className="my-auto z-10 py-4 px-3">
            <div className="p-6 rounded-2xl bg-[#FFFDF9]/90 border border-[#D4AF37]/50 shadow-xs backdrop-blur-xs">
              <p className="font-amiri text-2xl sm:text-3xl font-bold text-[#2C241E] leading-[2.2] tracking-wide">
                ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
              </p>
              <div className="w-12 h-px bg-[#D4AF37] mx-auto my-3" />
              <span className="font-cairo text-xs font-bold text-[#8A6721]">
                [ سورة الروم : 21 ]
              </span>
            </div>
          </div>

          {/* Bottom Quran & Jasmine Visual */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-4 z-10 border border-[#D4AF37]/30">
            <img 
              src={quranImg} 
              alt="المصحف الشريف" 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C241E]/80 via-transparent to-transparent flex items-end justify-center pb-2">
              <span className="text-[11px] font-cairo text-[#FFE7A3]">
                بالمودة والرحمة تكتمل الأفراح
              </span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            2 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 3: أبيات الترحيب المطلوبة نصاً (يا مرحبا ترحيب ينشر بالهبوب...)
    // -------------------------------------------------------------
    case 2:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Top Emblem */}
          <div className="pt-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/40 text-xs font-cairo font-bold text-[#8A6721]">
              <span>✨</span>
              <span>ترحيب وإكرام الأهل</span>
              <span>✨</span>
            </div>
          </div>

          {/* The Welcome Poetry (أبيات الترحيب - كما بالصورة 3) */}
          <div className="my-auto z-10 py-6 px-2">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#FFFDF9] border border-[#D4AF37]/60 shadow-sm space-y-4">
              {profile.welcomeVerseLines.map((line, idx) => (
                <div key={idx} className="relative">
                  <p className="font-ruqaa text-xl sm:text-2xl font-bold text-[#2C241E] leading-relaxed">
                    «{line}»
                  </p>
                  {idx < 3 && (
                    <div className="w-8 h-px bg-[#D4AF37]/40 mx-auto my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Skyline with Jasmine Flowers */}
          <div className="relative w-full h-36 rounded-2xl overflow-hidden mt-4 z-10 border border-[#D4AF37]/30">
            <img 
              src={palaceBg} 
              alt="قصور صنعاء" 
              className="w-full h-full object-cover object-bottom opacity-85" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent" />
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            3 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 4: بطاقة الدعوة الرسمية واسم العريس الدكتور أكرم سيلان
    // -------------------------------------------------------------
    case 3:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-5 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Top Luxury Cuff & Watch Aesthetic Banner */}
          <div className="relative w-full h-32 rounded-2xl overflow-hidden z-10 border border-[#D4AF37]/30">
            <img 
              src={groomLuxuryImg} 
              alt="العريس" 
              className="w-full h-full object-cover object-top" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent" />
          </div>

          {/* Host Statement & Groom Name (كما بالصورة 4) */}
          <div className="my-auto z-10 py-3 space-y-3">
            <span className="text-xs font-cairo font-bold text-[#8A6721]">
              يتشرف
            </span>

            <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E] leading-snug">
              الحاج عبدالخالق سيلان وأولاده
            </h3>

            <p className="font-cairo text-xs sm:text-sm text-[#54463A]">
              بدعوتكم لحضور زفاف عريسنا الغالي
            </p>

            {/* Groom Name Badge (شريط العريس الملكي الأخضر الداكن المذهب) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F382A] via-[#1A4B3A] to-[#0F382A] border-2 border-[#D4AF37] shadow-md my-3">
              <h2 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[#FFE7A3] drop-shadow-xs">
                الدكتور أكرم سيلان
              </h2>
            </div>

            {/* Event Name & Date */}
            <div className="space-y-1 pt-1">
              <div className="inline-flex items-center gap-2 text-xs font-cairo font-bold text-[#8A6721]">
                <span>❖</span>
                <span>المقيل والزفة</span>
                <span>❖</span>
              </div>
              <p className="font-cairo text-sm font-bold text-[#2C241E]">
                وذلك يوم الخميس 15 من شهر سبتمبر 2026 م
              </p>
              <p className="font-cairo text-xs text-[#54463A]">
                بصالة بيت سيلان الخيرية
              </p>
            </div>
          </div>

          {/* Quick Action Button for Calendar */}
          <div className="z-10 pt-2">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF5EB] hover:bg-[#F4E9D0] border border-[#D4AF37]/50 text-[#8A6721] text-xs font-cairo font-bold shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>حفظ الموعد في التقويم</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            4 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 5: العداد التنازلي المباشر (تبقى على زفافنا) مع خلفية القصر
    // -------------------------------------------------------------
    case 4:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#1F2722] text-[#FAF5EB] overflow-hidden rounded-2xl">
          {/* Palace Background */}
          <div className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none">
            <img src={palaceBg} alt="صنعاء" className="w-full h-full object-cover" />
          </div>

          {/* Top Title (تبقى على زفافنا - كما بالصورة 5) */}
          <div className="pt-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F382A]/90 border border-[#D4AF37]/50 shadow-md">
              <span className="text-[#D4AF37]">⏳</span>
              <h3 className="font-ruqaa text-xl sm:text-2xl font-bold text-[#FFE7A3]">
                تبقى على زفافنا
              </h3>
            </div>
          </div>

          {/* The 4 Arched Countdown Digits (أيام، ساعات، دقائق، ثواني) */}
          <div className="my-auto z-10 py-6">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
              {/* Seconds */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#14231B]/90 border border-[#D4AF37]/60 shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FFE7A3] font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-[#D4AF37] font-cairo font-bold mt-1 border-t border-[#D4AF37]/30 pt-1">
                  ثانية
                </div>
              </div>

              {/* Minutes */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#14231B]/90 border border-[#D4AF37]/60 shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FFE7A3] font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-[#D4AF37] font-cairo font-bold mt-1 border-t border-[#D4AF37]/30 pt-1">
                  دقيقة
                </div>
              </div>

              {/* Hours */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#14231B]/90 border border-[#D4AF37]/60 shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FFE7A3] font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-[#D4AF37] font-cairo font-bold mt-1 border-t border-[#D4AF37]/30 pt-1">
                  ساعة
                </div>
              </div>

              {/* Days */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#14231B]/90 border border-[#D4AF37]/60 shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FFE7A3] font-mono">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-[#D4AF37] font-cairo font-bold mt-1 border-t border-[#D4AF37]/30 pt-1">
                  يوماً
                </div>
              </div>
            </div>

            <div className="mt-6 font-cairo text-xs text-[#D4AF37] font-semibold">
              الخميس | 15 سبتمبر 2026 م - ابتداءً من 4:00 عصراً
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#D4AF37]/70 pb-2 z-10">
            5 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 6: فعاليات الزفاف والأوقات المحددة (استقبال، مقيل، زفة)
    // -------------------------------------------------------------
    case 5:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Heading */}
          <div className="pt-4 z-10">
            <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E]">
              فعاليات الزفاف
            </h3>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-2" />
          </div>

          {/* 3 Events Timeline (كما بالصورة 6) */}
          <div className="my-auto z-10 space-y-4 py-4 max-w-sm mx-auto w-full">
            {/* Event 1: 1:30 ظهراً - استقبال الضيوف */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs flex items-center justify-between">
              <div className="text-right">
                <span className="block font-cairo text-xs text-[#8A6721] font-bold">1:30 ظهراً</span>
                <h4 className="font-ruqaa text-lg font-bold text-[#2C241E]">استقبال الضيوف الكرام</h4>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#0F382A]/10 border border-[#0F382A]/30 flex items-center justify-center text-[#0F382A]">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Event 2: 4:00 عصراً - المقيل */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs flex items-center justify-between">
              <div className="text-right">
                <span className="block font-cairo text-xs text-[#8A6721] font-bold">4:00 عصراً</span>
                <h4 className="font-ruqaa text-lg font-bold text-[#2C241E]">جلسة المقيل الصنعاني</h4>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#0F382A]/10 border border-[#0F382A]/30 flex items-center justify-center text-[#0F382A]">
                <Coffee className="w-5 h-5" />
              </div>
            </div>

            {/* Event 3: 9:00 مساءً - الزفة */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs flex items-center justify-between">
              <div className="text-right">
                <span className="block font-cairo text-xs text-[#8A6721] font-bold">9:00 مساءً</span>
                <h4 className="font-ruqaa text-lg font-bold text-[#2C241E]">موكب الزفة المباركة</h4>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#0F382A]/10 border border-[#0F382A]/30 flex items-center justify-center text-[#0F382A]">
                <Sparkles className="w-5 h-5 text-[#8A6721]" />
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            6 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 7: موقع القاعة وخريطة Google Maps (صالة بيت سيلان الخيرية)
    // -------------------------------------------------------------
    case 6:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Heading */}
          <div className="pt-4 z-10">
            <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E]">
              موقع القاعة
            </h3>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-2" />
          </div>

          {/* Venue Info (كما بالصورة 7) */}
          <div className="my-auto z-10 py-3 space-y-4 max-w-sm mx-auto w-full">
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-cairo font-bold text-[#8A6721]">
                <MapPin className="w-4 h-4 text-[#8A6721]" />
                <span>صالة بيت سيلان الخيرية</span>
              </div>
              <p className="font-cairo text-xs sm:text-sm text-[#54463A]">
                صنعاء - الجمهورية اليمنية
              </p>
            </div>

            {/* Stylized Visual Map Card */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-md bg-[#ECE5D8]">
              {/* Map Illustration / Grid */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8A6721_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Streets Graphic Simulation */}
              <svg className="w-full h-full opacity-35" viewBox="0 0 300 200">
                <path d="M 0 50 Q 150 70 300 40" stroke="#8A6721" strokeWidth="4" fill="none" />
                <path d="M 40 0 Q 70 100 80 200" stroke="#8A6721" strokeWidth="3" fill="none" />
                <path d="M 180 0 Q 160 100 220 200" stroke="#8A6721" strokeWidth="4" fill="none" />
                <path d="M 0 140 Q 150 160 300 130" stroke="#0F382A" strokeWidth="4" fill="none" />
              </svg>

              {/* Map Pin Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37] shadow-lg text-[11px] font-cairo font-bold text-[#2C241E] whitespace-nowrap mb-1">
                  📍 صالة بيت سيلان الخيرية
                </div>
                <div className="w-4 h-4 rounded-full bg-[#E53E3E] border-2 border-white shadow-md animate-bounce" />
              </div>
            </div>

            {/* Google Maps External Action Button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#0F382A] to-[#1A4B3A] text-[#FAF5EB] font-cairo font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span>فتح الموقع على Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            7 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 8: وفي الختام (شكراً لكل من شرفنا بحضوره وتمنيات الخير)
    // -------------------------------------------------------------
    case 7:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Top Sana'a Mountains Landscape */}
          <div className="relative w-full h-36 rounded-2xl overflow-hidden z-10 border border-[#D4AF37]/30">
            <img 
              src={palaceBg} 
              alt="صنعاء وقت الغروب" 
              className="w-full h-full object-cover object-top brightness-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent" />
          </div>

          {/* Thank You Note (وفي الختام - كما بالصورة 8) */}
          <div className="my-auto z-10 py-6 px-4 space-y-4">
            <span className="text-xs font-cairo font-bold text-[#8A6721]">
              ✦ وَفِي الْخِتَام ✦
            </span>

            <h3 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[#2C241E] leading-relaxed">
              شكراً لكل من شرفنا بحضوره ومشاركته فرحتنا
            </h3>

            <div className="w-16 h-px bg-[#D4AF37] mx-auto my-3" />

            <p className="font-amiri text-lg sm:text-xl text-[#54463A] leading-relaxed">
              نسأل الله أن يجعل أيامكم كلها أفراحاً ويبارك فيكم ويجمعنا وإياكم على خير ومسرات دائمة.
            </p>
          </div>

          {/* Family Title */}
          <div className="z-10 pb-2">
            <p className="font-ruqaa text-lg text-[#8A6721] font-bold">
              داعيكم / آل سيلان الكرام
            </p>
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            8 / 9
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // CARD 9: بارك الله لك يا عريسنا الغالي (الدعاء النبوي والجنبية الصنعاني)
    // -------------------------------------------------------------
    case 8:
      return (
        <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 text-center bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-3xl pointer-events-none" />

          {/* Heading (بارك الله لك يا عريسنا الغالي - كما بالصورة 9) */}
          <div className="pt-4 z-10">
            <p className="font-cairo text-xs sm:text-sm font-bold text-[#8A6721]">
              بارك الله لك يا عريسنا الغالي
            </p>
            <h2 className="font-ruqaa text-3xl sm:text-5xl font-bold text-[#2C241E] gold-gradient-text mt-1">
              الدكتور أكرم سيلان
            </h2>
          </div>

          {/* Prophet's Blessing & Good Wishes (وجمع بينكما في خير) */}
          <div className="my-auto z-10 py-4 px-3 space-y-3">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs space-y-3">
              <p className="font-amiri text-xl sm:text-2xl font-bold text-[#0F382A] leading-relaxed">
                « وجمع بينكما في خير »
              </p>
              <div className="w-12 h-px bg-[#D4AF37] mx-auto" />
              <p className="font-ruqaa text-lg sm:text-xl text-[#54463A] leading-relaxed">
                وبارك عليكما وأدامكما سعادة في الدنيا والآخرة
              </p>
            </div>
          </div>

          {/* Bottom Janbiya Dagger & Kashmiri Shawl Visual */}
          <div className="relative w-full h-40 rounded-2xl overflow-hidden z-10 border border-[#D4AF37]/30">
            <img 
              src={janbiyaImg} 
              alt="الجنبية اليمنية والشال" 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F382A]/85 via-transparent to-transparent flex items-end justify-center pb-2">
              <span className="text-[11px] font-cairo text-[#FAF5EB] font-bold">
                ألف ألف مبروك للعريس الغالي
              </span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#8A6721] pt-3 z-10">
            9 / 9
          </div>
        </div>
      );

    default:
      return null;
  }
};
