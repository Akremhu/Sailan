import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Users, 
  Coffee, 
  Sparkles, 
  ExternalLink,
  Clock,
  Copy,
  Check,
  Car,
  UserCheck,
  Send,
  Heart,
  ChevronDown,
  ShieldCheck,
  Music4
} from 'lucide-react';
import { SAYLAN_WEDDING_PROFILE } from '../data/weddingProfiles';
import { soundManager } from '../utils/audio';
import { copyTextToClipboard } from '../utils/clipboard';
import { useIntersectionFadeIn } from '../hooks/useIntersectionFadeIn';
import { rsvpStorage } from '../utils/rsvpStorage';
import { HostRsvpDashboardModal } from './HostRsvpDashboardModal';

// Featured Groom Luxury Image
import groomLuxuryImg from '../assets/images/groom_akram_saylan_1790344163840.jpg';

interface ContinuousInvitationProps {
  targetDate: Date;
}

// -------------------------------------------------------------
// Extreme Motion & Cinematic Blur Variants
// -------------------------------------------------------------
const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

// Dramatic Blur-Fade Rise with spring overshoot
const extremeFadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 35, 
    scale: 0.94,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.85, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

// Pop and rotating blossom for icons
const blossomIconVariant: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 320, damping: 18 }
  }
};

export const ContinuousInvitation: React.FC<ContinuousInvitationProps> = ({ targetDate }) => {
  const profile = SAYLAN_WEDDING_PROFILE;
  const [copied, setCopied] = useState(false);
  const [blessingLiked, setBlessingLiked] = useState(false);
  const [blessingLikesCount, setBlessingLikesCount] = useState(128);
  const [likeFloatingHearts, setLikeFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  // -------------------------------------------------------------
  // Intersection Observer API Hooks for Core Sections:
  // (1) الاسم (Groom Wordmark Section)
  // (2) القصيدة (Welcome Poetry Section)
  // (3) التاريخ والوقت (Date & Countdown Section)
  // (4) المكان (Venue & Location Card Section)
  // -------------------------------------------------------------
  const nameSectionObs = useIntersectionFadeIn<HTMLElement>({ threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  const poemSectionObs = useIntersectionFadeIn<HTMLElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const dateSectionObs = useIntersectionFadeIn<HTMLElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const venueSectionObs = useIntersectionFadeIn<HTMLElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // RSVP interactive state
  const [guestName, setGuestName] = useState('');
  const [guestAttendance, setGuestAttendance] = useState<'yes' | 'apologies'>('yes');
  const [guestCount, setGuestCount] = useState('1');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showHostDashboard, setShowHostDashboard] = useState(false);

  // Parallax & Scroll Intensity
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 600], [0, 65]);
  const heroImageScale = useTransform(scrollY, [0, 500], [1.05, 1.15]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Open host dashboard automatically if ?admin=saylan in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'saylan' || urlParams.get('host') === '1') {
      setShowHostDashboard(true);
    }
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('صالة بيت سيلان خمر عمران اليمن')}`;

  const handleAddToCalendar = () => {
    soundManager.playChimeTone();
    const title = encodeURIComponent(`أفراح آل سيلان | زفاف ${profile.groomFullName}`);
    const details = encodeURIComponent(`${profile.hostStatement} ${profile.groomFullName}. المناسبة: المقيل والزفة في ${profile.venueName}، ${profile.venueCity}. وبحضوركم يتم لنا الفرح والسرور.`);
    const location = encodeURIComponent(`${profile.venueName}، ${profile.venueCity}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261015T103000Z/20261015T210000Z`;
    window.open(url, '_blank');
  };

  const handleCopyAddress = async () => {
    soundManager.playClickTone();
    await copyTextToClipboard(`${profile.venueName} - ${profile.venueCity}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChimeTone();
    rsvpStorage.addEntry({
      name: guestName.trim() || 'ضيف كريم',
      attendance: guestAttendance,
      guestCount: guestAttendance === 'yes' ? (guestCount === '4+' ? 4 : Number(guestCount)) : 0,
    });
    setRsvpSubmitted(true);
  };

  const triggerLikeBurst = () => {
    soundManager.playChimeTone();
    setBlessingLikesCount(prev => prev + 1);
    setBlessingLiked(true);

    // Spawn 3 floating hearts with unique positions
    const newHearts = [
      { id: Date.now() + 1, x: -20 + Math.random() * 40 },
      { id: Date.now() + 2, x: -30 + Math.random() * 60 },
      { id: Date.now() + 3, x: -10 + Math.random() * 30 },
    ];
    setLikeFloatingHearts(prev => [...prev, ...newHearts]);

    setTimeout(() => {
      setLikeFloatingHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
    }, 1500);
  };

  return (
    <article id="continuous-invitation-container" className="w-full max-w-xl mx-auto px-4 sm:px-6 py-4 space-y-14 sm:space-y-20 select-none relative">

      {/* =========================================================================
          2. الافتتاحية والآية الكريمة:
          - الشعار التراثي: 𐩱𐩫𐩧𐩣
          - الشارة العائلية: أفراح آل سيلان
          - البسملة الشريفة: بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          - الآية القرآنية: سورة الروم : 21
          ========================================================================= */}
      <motion.section 
        id="section-basmala"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={containerStagger}
        className="text-center pt-2 pb-1 space-y-4"
      >
        <motion.div variants={extremeFadeUp} className="inline-flex items-center gap-3 text-[#9A7426]">
          <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
          <motion.span 
            variants={blossomIconVariant}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="font-mono text-sm tracking-[0.35em] text-[#8A6721] px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/40 shadow-xs inline-block cursor-default"
          >
            𐩱𐩫𐩧𐩣
          </motion.span>
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
        </motion.div>

        <motion.div variants={extremeFadeUp}>
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#FAF5EB] via-white to-[#FAF5EB] border border-[#D4AF37]/40 text-xs font-cairo font-bold text-[#8A6721] tracking-wide shadow-2xs">
            أفراح آل سيلان
          </span>
        </motion.div>

        <motion.h2 
          variants={extremeFadeUp}
          className="font-amiri text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C241E] leading-loose drop-shadow-sm select-text"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.h2>

        <motion.div variants={extremeFadeUp} className="flex justify-center pt-1">
          <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce opacity-80" />
        </motion.div>
      </motion.section>


      {/* الآية القرآنية الكريمة (سورة الروم : 21) */}
      <motion.section 
        id="section-quran"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={containerStagger}
        className="text-center max-w-lg mx-auto px-4 py-2"
      >
        <div className="space-y-4">
          <motion.div variants={extremeFadeUp} className="inline-flex items-center gap-2.5 text-xs font-cairo font-semibold text-[#9A7426]">
            <motion.span variants={blossomIconVariant} className="text-[#D4AF37] text-sm">✦</motion.span>
            <span className="tracking-widest">قال تعالى</span>
            <motion.span variants={blossomIconVariant} className="text-[#D4AF37] text-sm">✦</motion.span>
          </motion.div>

          <motion.p 
            variants={extremeFadeUp}
            className="font-amiri text-xl sm:text-2xl md:text-[27px] font-bold text-[#2C241E] leading-[2.2] text-balance select-text"
          >
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
          </motion.p>

          <motion.span 
            variants={extremeFadeUp}
            className="inline-block font-cairo text-xs text-[#8A6721] font-medium tracking-wide bg-[#FAF5EB] px-3.5 py-1 rounded-full border border-[#D4AF37]/30 shadow-2xs"
          >
            [ سورة الروم : 21 ]
          </motion.span>
        </div>
      </motion.section>


      {/* =========================================================================
          3. إطلالة العريس واسم العريس الرئيسي (قسم الاسم):
          - اللقب العلوي للإطلالة: WEDDING INVITATION — دَعْـــــوَة زِفاف
          - صيغة الاستضافة: « يتشرف الحاج عبدالخالق سيلان وأولاده بدعوتكم الكريمة لحضور زفاف »
          - شارة نجلنا: ✦ نجلنا الغالي ✦
          - الاسم المختصر: الدكتور أكرم سيلان
          - الدعاء والتبريكة المسندية: 𐩨𐩧𐩫𐩩 ✦ بارك الله لهما وجمع بينهما في خير ✦ 𐩪𐩲𐩵
          - عبارة إتمام الفرح: « وبحضوركم يتم لنا الفرح والسرور »
          ========================================================================= */}
      <section 
        ref={nameSectionObs.ref}
        id="section-groom-hero-wordmark"
        className={`relative rounded-[36px] overflow-hidden bg-[#FAF8F5] border border-[#D4AF37]/45 shadow-[0_20px_60px_rgba(44,36,30,0.09)] interactive-luxury-card transition-all duration-1000 ${
          nameSectionObs.isVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
        }`}
      >
        {/* Parallax Groom Image */}
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] overflow-hidden bg-neutral-950">
          <motion.img
            style={{ y: heroImageY, scale: heroImageScale }}
            src={groomLuxuryImg}
            alt="إطلالة العريس الدكتور أكرم عبدالخالق سيلان"
            className="w-full h-[120%] object-cover object-[center_20%] transition-transform duration-700"
          />
          
          {/* Multi-layered smooth gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/40 to-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/95 to-transparent" />

          {/* Floating Calligraphy: "دَعْــــوَة زِفاف" */}
          <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none px-4 transition-all duration-700">
            <span className="font-cairo text-[11px] tracking-[0.3em] text-[#8A6721] font-bold block mb-1 uppercase">
              WEDDING INVITATION
            </span>
            <h1 className="font-ruqaa text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C241E] drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
              دَعْـــــوَة زِفاف
            </h1>
          </div>
        </div>

        {/* Hero Content & Groom Wordmark */}
        <div className="px-5 sm:px-8 pt-4 pb-8 text-center space-y-6">
          
          {/* Quick interactive floating actions (الموقع 📍 والتقويم 📅) */}
          <div className="flex items-center justify-center gap-8 py-1">
            <motion.a
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.92 }}
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1.5 cursor-pointer"
              title="موقع القاعة في خرائط Google"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#8A6721] group-hover:bg-[#0F382A] group-hover:text-[#FAF5EB] group-hover:border-[#0F382A] transition-all shadow-md pulse-gold-ring">
                <MapPin className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </div>
              <span className="text-[11px] font-cairo font-semibold text-[#6D5222] group-hover:text-[#0F382A] transition-colors">
                الموقع 📍
              </span>
            </motion.a>

            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <motion.button
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCalendar}
              className="group flex flex-col items-center gap-1.5 cursor-pointer"
              title="إضافة الموعد للتقويم"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#8A6721] group-hover:bg-[#8A6721] group-hover:text-[#FAF5EB] group-hover:border-[#8A6721] transition-all shadow-md">
                <Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </div>
              <span className="text-[11px] font-cairo font-semibold text-[#6D5222] group-hover:text-[#8A6721] transition-colors">
                التقويم 📅
              </span>
            </motion.button>
          </div>

          {/* Host Statement (محاذاة وسط وبارز ومميز كما طُلب) */}
          <div className="pt-4 pb-2 px-2 text-center max-w-xl mx-auto">
            <div className="inline-block py-2.5 px-6 rounded-2xl bg-gradient-to-r from-transparent via-[#FAF5EB] to-transparent border-y border-[#D4AF37]/50 shadow-2xs">
              <p className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#2C241E] font-bold leading-relaxed tracking-wide select-text drop-shadow-xs">
                {profile.hostStatement}
              </p>
            </div>
          </div>

          {/* THE GROOM WORDMARK: شارة نجلنا الغالي + الدكتور أكرم سيلان */}
          <div className="py-5 px-4 rounded-3xl bg-white/80 border border-[#D4AF37]/45 shadow-sm transition-all duration-500 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md">
            {/* Top flourish: ✦ نجلنا الغالي ✦ */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
              <span className="text-xs font-cairo font-bold text-[#8A6721] tracking-widest flex items-center gap-1">
                <span>✦</span>
                <span>نجلنا الغالي</span>
                <span>✦</span>
              </span>
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
            </div>

            {/* The Main Name: الدكتور أكرم سيلان */}
            <div className="space-y-1 my-3">
              <h2 className="font-ruqaa text-4xl sm:text-6xl md:text-7xl font-bold tracking-normal leading-tight gold-shimmer-text drop-shadow-xs select-text cursor-default">
                الدكتور أكرم سيلان
              </h2>
            </div>

            {/* Bottom Musnad blessing mark with interactive Heart Burst */}
            <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between px-2 text-xs text-[#9A7426]">
              <div className="flex items-center gap-2 font-mono">
                <span className="tracking-widest font-bold">𐩨𐩧𐩫𐩩</span>
                <span className="text-[10px] text-[#D4AF37]">✦</span>
                <span className="tracking-widest font-bold">𐩪𐩲𐩵</span>
              </div>

              {/* Heart Burst Action */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={triggerLikeBurst}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EB] hover:bg-rose-50 border border-[#D4AF37]/40 transition-all text-[#8A6721] hover:text-rose-600 shadow-2xs cursor-pointer"
                  title="أرسل تبريكة مباركة للعريس"
                >
                  <Heart className={`w-4 h-4 ${blessingLiked ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'}`} />
                  <span className="text-xs font-cairo font-bold">{blessingLikesCount}</span>
                </motion.button>

                {/* Floating hearts container */}
                <AnimatePresence>
                  {likeFloatingHearts.map(heart => (
                    <motion.div
                      key={heart.id}
                      initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
                      animate={{ opacity: 0, y: -65, x: heart.x * 1.5, scale: 1.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="absolute bottom-8 left-4 pointer-events-none text-rose-500 z-30"
                    >
                      <Heart className="w-5 h-5 fill-rose-500" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Invitation Closing Verse: « وبحضوركم يتم لنا الفرح والسرور » */}
          <div className="pt-1">
            <p className="font-ruqaa text-2xl sm:text-3xl text-[#8A6721] font-bold leading-relaxed">
              « وبحضوركم يتم لنا الفرح والسرور »
            </p>
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. الترحيب والقصيدة الشعرية (إكرام الأهل):
          - العنوان: ✦ ترحيب ✦
          - الأبيات بدون أقواس تنصيص زائدة
          ========================================================================= */}
      <section 
        ref={poemSectionObs.ref}
        id="section-welcome-poetry"
        className={`rounded-3xl p-6 sm:p-8 bg-[#FAF5EB]/90 border border-[#D4AF37]/40 text-center shadow-xs space-y-4 interactive-luxury-card transition-all duration-1000 ${
          poemSectionObs.isVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
        }`}
      >
        <div className="inline-flex items-center gap-2 text-xs font-cairo font-bold text-[#8A6721]">
          <span>✦</span>
          <span>ترحيب</span>
          <span>✦</span>
        </div>

        <div className="space-y-3 font-ruqaa text-lg sm:text-xl md:text-2xl text-[#2C241E] leading-loose max-w-md mx-auto">
          {profile.welcomeVerseLines.map((line, idx) => (
            <motion.p 
              key={idx}
              whileHover={{ scale: 1.03, color: '#8A6721', x: 2 }}
              transition={{ duration: 0.2 }}
              className={`cursor-default transition-all p-1.5 rounded-lg hover:bg-white/50 ${idx === 0 || idx === 3 ? 'text-[#8A6721] font-bold' : ''}`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>


      {/* =========================================================================
          5. التاريخ والوقت والبرنامج (قسم الموعد):
          - العنوان: موعدنا
          - شارة المناسبة: المقيل والزفة
          - التاريخ المعروض: الخميس | 15 / 10 / 2026 م
          - الوقت المعروض: ابتداءً من الساعة 1:30 ظهرا
          - برنامج ومراحل الحفل:
            1:30 ظهراً: استقبال الضيوف الكرام
            4:00 عصراً: جلسة المقيل
            9:00 مساءً: الزفة
          ========================================================================= */}
      <section 
        ref={dateSectionObs.ref}
        id="section-date-time"
        className={`space-y-6 transition-all duration-1000 ${
          dateSectionObs.isVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
        }`}
      >
        {/* Section Heading: موعدنا */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 text-[#8A6721]">
            <span className="h-px w-10 bg-[#D4AF37]/50" />
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E]">
              موعدنا
            </span>
            <span className="h-px w-10 bg-[#D4AF37]/50" />
          </div>
        </div>

        {/* Clean Date-Time Focus Card: المقيل والزفة */}
        <div className="p-6 rounded-3xl bg-white border border-[#D4AF37]/45 shadow-sm text-center space-y-3.5 interactive-luxury-card hover:-translate-y-1 transition-transform">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0F382A]/10 text-[#0F382A] text-xs font-cairo font-bold">
            {profile.occasionName}
          </div>

          <div className="space-y-1.5">
            <h3 className="font-cairo font-bold text-lg sm:text-2xl text-[#2C241E]">
              {profile.dateTimeBadge}
            </h3>
            <p className="font-cairo text-sm sm:text-base text-[#6D5222] font-semibold">
              {profile.timeBadge}
            </p>
          </div>
        </div>

        {/* Interactive Live Countdown Display: يوم | ساعة | دقيقة | ثانية */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 text-center">
          {/* Days */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -4 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 shadow-xs transition-all hover:bg-white interactive-luxury-card"
          >
            <span className="block text-[10px] text-[#8A6721]/70 font-mono">𐩺</span>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#2C241E] font-cairo tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-xs font-bold text-[#8A6721] font-ruqaa mt-1 pt-1 border-t border-[#D4AF37]/20">
              يوم
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -4 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 shadow-xs transition-all hover:bg-white interactive-luxury-card"
          >
            <span className="block text-[10px] text-[#8A6721]/70 font-mono">𐩪</span>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#2C241E] font-cairo tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs font-bold text-[#8A6721] font-ruqaa mt-1 pt-1 border-t border-[#D4AF37]/20">
              ساعة
            </div>
          </motion.div>

          {/* Minutes */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -4 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 shadow-xs transition-all hover:bg-white interactive-luxury-card"
          >
            <span className="block text-[10px] text-[#8A6721]/70 font-mono">𐩵</span>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#2C241E] font-cairo tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs font-bold text-[#8A6721] font-ruqaa mt-1 pt-1 border-t border-[#D4AF37]/20">
              دقيقة
            </div>
          </motion.div>

          {/* Seconds */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -4 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 shadow-xs transition-all hover:bg-white interactive-luxury-card"
          >
            <span className="block text-[10px] text-[#8A6721]/70 font-mono">𐩻</span>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#8A6721] font-cairo tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs font-bold text-[#8A6721] font-ruqaa mt-1 pt-1 border-t border-[#D4AF37]/20">
              ثانية
            </div>
          </motion.div>
        </div>

        {/* Wedding Activities & Timeline: استقبال الضيوف، المقيل، الزفة مع تأثيرات تفاعلية وأيقونات متحركة */}
        <div className="space-y-3.5 pt-3 max-w-md mx-auto">
          {/* 1. استقبال الضيوف */}
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => soundManager.playClickTone()}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-white via-[#FAF8F5] to-white border border-[#D4AF37]/40 flex items-center justify-between shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#D4AF37] to-[#8C6212] group-hover:w-2 transition-all" />
            <div className="pr-3 text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0F382A]/10 text-[#0F382A] font-cairo text-[11px] font-bold mb-1">
                1:30 ظهراً
              </span>
              <h4 className="font-ruqaa text-lg sm:text-xl font-bold text-[#2C241E] group-hover:text-[#8A6721] transition-colors">
                استقبال الضيوف الكرام
              </h4>
              <p className="font-cairo text-xs text-[#8A6721]">
                أهلاً وسهلاً بجميع الأحبة والأصدقاء
              </p>
            </div>
            
            <div className="relative">
              {/* Pulse rings */}
              <div className="absolute -inset-1 rounded-full bg-[#0F382A]/20 blur-xs group-hover:scale-125 transition-transform" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#0F382A] to-[#164736] text-[#FAF5EB] flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <Users className="w-5 h-5 text-[#D4AF37] group-hover:scale-115 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* 2. جلسة المقيل */}
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => soundManager.playClickTone()}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-white via-[#FAF8F5] to-white border border-[#D4AF37]/40 flex items-center justify-between shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#8C6212] to-[#D4AF37] group-hover:w-2 transition-all" />
            <div className="pr-3 text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8A6721]/15 text-[#8A6721] font-cairo text-[11px] font-bold mb-1">
                4:00 عصراً
              </span>
              <h4 className="font-ruqaa text-lg sm:text-xl font-bold text-[#2C241E] group-hover:text-[#8A6721] transition-colors">
                جلسة المقيل
              </h4>
              <p className="font-cairo text-xs text-[#8A6721]">
                أنس الأحبة وطيب اللقاء ومجالس السمر
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[#8A6721]/20 blur-xs group-hover:scale-125 transition-transform" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF5EB] to-[#F3E8CF] border-2 border-[#D4AF37] text-[#8A6721] flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <Coffee className="w-5 h-5 text-[#8A6721] group-hover:scale-115 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* 3. الزفة */}
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => soundManager.playCelebrationChime()}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-white via-[#FAF8F5] to-white border border-[#D4AF37]/50 flex items-center justify-between shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#D4AF37] via-[#FFDF73] to-[#8C6212] group-hover:w-2 transition-all" />
            <div className="pr-3 text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37]/25 to-[#AA820A]/20 text-[#6D4E12] font-cairo text-[11px] font-bold mb-1">
                9:00 مساءً
              </span>
              <h4 className="font-ruqaa text-lg sm:text-xl font-bold text-[#2C241E] group-hover:text-[#8A6721] transition-colors flex items-center gap-1.5">
                <span>الزفة الميمونة</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              </h4>
              <p className="font-cairo text-xs text-[#8A6721]">
                زفاف عريسنا الغالي على ألحان التراث اليمني
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[#D4AF37]/30 blur-xs group-hover:scale-125 transition-transform animate-pulse" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#8A6721] to-[#D4AF37] text-white flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                <Music4 className="w-5 h-5 text-[#FAF5EB] group-hover:scale-115 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* =========================================================================
          6. المكان والوصول (قسم القاعة والملاحة):
          - شارة المكان: مكان الزفاف
          - اسم القاعة: قاعة بيت سيلان الخيرية
          - المدينة والدولة: بيت سيلان - خمر
          - المزايا: مواقف مخصصة متوفرة
          - الأزرار التفاعلية:
            * نسخ العنوان
            * فتح موقع القاعة على Google Maps
            * إضافة للتقويم (Google Calendar)
          ========================================================================= */}
      <section 
        ref={venueSectionObs.ref}
        id="section-venue"
        className={`rounded-3xl p-6 sm:p-8 bg-[#FAF5EB] border border-[#D4AF37]/45 text-center shadow-xs space-y-4 interactive-luxury-card transition-all duration-1000 ${
          venueSectionObs.isVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
        }`}
      >
        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0F382A]/10 text-[#0F382A] text-xs font-bold font-cairo">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>مكان الزفاف</span>
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[#2C241E] leading-normal select-text">
            {profile.venueName}
          </h3>
          <p className="font-cairo text-sm font-semibold text-[#0F382A]">
            {profile.venueCity}
          </p>
        </div>

        {/* Copy address & Parking features with interactive feedback */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#D4AF37]/40 text-[#6D5222] text-xs font-semibold hover:border-[#D4AF37] transition-all shadow-2xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
            <span>{copied ? 'تم نسخ العنوان بنجاح ✓' : 'نسخ العنوان'}</span>
          </motion.button>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#0F382A] font-cairo bg-white px-3.5 py-2 rounded-xl border border-[#0F382A]/20">
            <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>مواقف مخصصة متوفرة</span>
          </div>
        </div>
      </section>


      {/* زر الملاحة والخريطة + إضافة للتقويم Google Calendar */}
      <motion.section 
        id="section-map-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={containerStagger}
        className="rounded-3xl p-6 sm:p-8 bg-white border border-[#D4AF37]/40 shadow-xs text-center space-y-4 interactive-luxury-card"
      >
        <motion.div variants={extremeFadeUp} className="space-y-1">
          <h4 className="font-ruqaa text-2xl font-bold text-[#2C241E]">
            تيسير الوصول والملاحة
          </h4>
          <p className="font-cairo text-xs text-[#8C6D38]">
            اضغط على الزر أدناه لفتح موقع القاعة مباشرة في خرائط Google
          </p>
        </motion.div>

        {/* Primary Map CTA */}
        <motion.div variants={extremeFadeUp} className="max-w-sm mx-auto space-y-2.5">
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#0F382A] hover:bg-[#154a37] text-[#FAF5EB] font-cairo font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all relative overflow-hidden"
          >
            <Navigation className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
            <span>فتح موقع القاعة على Google Maps</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </motion.a>

          {/* إضافة للتقويم (Google Calendar) */}
          <div className="pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCalendar}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FAF5EB] hover:bg-[#F3E8CF] border border-[#D4AF37]/45 text-[#4A3816] font-cairo font-bold text-xs transition-all cursor-pointer shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-[#8A6721]" />
              <span>إضافة للتقويم (Google Calendar)</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>


      {/* =========================================================================
          7. تأكيد الحضور (RSVP):
          - العنوان: تأكيد الحضور الكريم
          - العنوان الفرعي: يسعدنا تأكيد حضوركم
          - النص التوضيحي: لحسن الاستقبال والضيافة، يسعدنا مشاركتنا رغبتكم الكريمة بالحضور
          - خيارات الحضور: ✓ سأحضر بمشيئة الله أو أعتذر لظرف طارئ
          - عدد المرافقين: (شخص واحد، شخصان، 3 أشخاص، 4+)
          - الزر: تأكيد وإرسال الرد
          ========================================================================= */}
      <motion.section 
        id="section-rsvp"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={containerStagger}
        className="rounded-3xl p-6 sm:p-8 bg-[#FAF8F5] border border-[#D4AF37]/45 shadow-xs text-center space-y-5 interactive-luxury-card"
      >
        <motion.div variants={extremeFadeUp} className="space-y-1 max-w-sm mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/35 text-[#8A6721] text-xs font-cairo font-bold">
            <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تأكيد الحضور الكريم</span>
          </div>

          <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E]">
            يسعدنا تأكيد حضوركم
          </h3>
          <p className="font-cairo text-xs text-[#8C6D38]">
            لحسن الاستقبال والضيافة، يسعدنا مشاركتنا رغبتكم الكريمة بالحضور
          </p>
        </motion.div>

        {rsvpSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-6 rounded-2xl bg-white border border-[#D4AF37]/50 max-w-md mx-auto space-y-2.5 text-center shadow-xs"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-2xs">
              <Check className="w-7 h-7 text-emerald-600" />
            </div>
            <h4 className="font-ruqaa text-2xl font-bold text-[#2C241E]">
              {guestAttendance === 'yes' ? 'أهلاً وسهلاً بكم، شرفتمونا!' : 'عذراً لعدم تمكنكم، شكر الله سعيكم'}
            </h4>
            <p className="font-cairo text-xs text-[#6D5222] leading-relaxed">
              « أهلاً وسهلاً بكم، شرفتمونا! تم تسجيل ردكم الكريم يا ({guestName || 'ضيفنا العزيز'}). نتشرف بكم دائماً في مسراتنا. »
            </p>
            <button
              onClick={() => setRsvpSubmitted(false)}
              className="text-xs text-[#8A6721] underline pt-2 font-cairo hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              تعديل الرد
            </button>
          </motion.div>
        ) : (
          <motion.form 
            variants={extremeFadeUp}
            onSubmit={handleRsvpSubmit} 
            className="space-y-4 max-w-md mx-auto text-right"
          >
            <div>
              <label className="block text-xs font-cairo font-semibold text-[#54463A] mb-1">
                الاسم الكريم
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="اكتب اسمك الكريم هنا..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2C241E] font-cairo text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition-all placeholder:text-[#A89887]"
              />
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-cairo font-semibold text-[#54463A] mb-1.5">
                تأكيد الحضور
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGuestAttendance('yes')}
                  className={`py-2.5 px-3 rounded-xl font-cairo text-xs font-bold border transition-all cursor-pointer ${
                    guestAttendance === 'yes'
                      ? 'bg-[#0F382A] text-white border-[#0F382A] shadow-xs scale-[1.02]'
                      : 'bg-white text-[#6D5222] border-[#D4AF37]/35 hover:border-[#D4AF37]'
                  }`}
                >
                  ✓ سأحضر بمشيئة الله
                </button>
                <button
                  type="button"
                  onClick={() => setGuestAttendance('apologies')}
                  className={`py-2.5 px-3 rounded-xl font-cairo text-xs font-bold border transition-all cursor-pointer ${
                    guestAttendance === 'apologies'
                      ? 'bg-[#8C6D38] text-white border-[#8C6D38] shadow-xs scale-[1.02]'
                      : 'bg-white text-[#6D5222] border-[#D4AF37]/35 hover:border-[#D4AF37]'
                  }`}
                >
                  أعتذر لظرف طارئ
                </button>
              </div>
            </div>

            {/* Guest Count if attending */}
            {guestAttendance === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-xs font-cairo font-semibold text-[#54463A] mb-1">
                  عدد المرافقين
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2C241E] font-cairo text-sm focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="1">شخص واحد (أنا فقط)</option>
                  <option value="2">شخصان (أنا ومرافق)</option>
                  <option value="3">3 أشخاص</option>
                  <option value="4+">4 أشخاص أو أكثر</option>
                </select>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#8A6721] via-[#AA820A] to-[#8A6721] text-white font-cairo font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>تأكيد وإرسال الرد</span>
            </motion.button>
          </motion.form>
        )}
      </motion.section>


      {/* =========================================================================
          8. الختام وشكر الأهل:
          - العنوان: ✦ شكر وامتنان ✦
          - النص الرئيسي: شكراً لكل من شرفنا بحضوره ومشاركته فرحتنا
          - الدعاء: نسأل الله تعالى أن يجعل أيامكم كلها عامرة بالمسرات والأفراح الدائمة.
          - دعاء الختام المبارك: « بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ »
          ========================================================================= */}
      <motion.section 
        id="section-closing-blessing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={containerStagger}
        className="text-center pt-2 pb-6 space-y-4"
      >
        <motion.div variants={extremeFadeUp} className="space-y-2 max-w-md mx-auto">
          <p className="font-cairo text-xs font-bold text-[#8A6721]">
            ✦ شكر وامتنان ✦
          </p>
          <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E]">
            شكراً لكل من شرفنا بحضوره ومشاركته فرحتنا
          </h3>
          <p className="font-amiri text-base sm:text-lg text-[#54463A] leading-relaxed select-text">
            نسأل الله تعالى أن يجعل أيامكم كلها عامرة بالمسرات والأفراح الدائمة.
          </p>
        </motion.div>

        {/* Discreet Host Access Button (مخصص لصاحب الدعوة فقط لمعرفة من أكد الحضور والتحميل لجداول جوجل) */}
        <div className="pt-6">
          <button
            onClick={() => {
              soundManager.playClickTone();
              setShowHostDashboard(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-cairo text-[#8C6D38]/70 hover:text-[#0F382A] border border-transparent hover:border-[#D4AF37]/40 hover:bg-[#FAF5EB] transition-all cursor-pointer opacity-80 hover:opacity-100"
            title="بوابة صاحب الدعوة لمعرفة قائمة الحضور"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>لوحة صاحب الدعوة (تأكيدات الحضور)</span>
          </button>
        </div>
      </motion.section>

      {/* Host Private Dashboard Modal */}
      <HostRsvpDashboardModal
        isOpen={showHostDashboard}
        onClose={() => setShowHostDashboard(false)}
      />

    </article>
  );
};
