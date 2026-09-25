import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { MusnadColumn } from './MusnadPattern';
import { soundManager } from '../utils/audio';
import { SAYLAN_WEDDING_PROFILE } from '../data/weddingProfiles';

interface GatefoldEntranceProps {
  isOpen: boolean;
  onOpen: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GatefoldEntrance: React.FC<GatefoldEntranceProps> = ({
  isOpen,
  onOpen,
  isMuted,
  onToggleMute,
}) => {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);
  const profile = SAYLAN_WEDDING_PROFILE;

  // Ensure isOpeningAnimation is properly reset whenever isOpen becomes false (on re-closing)
  React.useEffect(() => {
    if (!isOpen) {
      setIsOpeningAnimation(false);
    }
  }, [isOpen]);

  const handleOpenClick = () => {
    if (isOpeningAnimation) return;
    setIsOpeningAnimation(true);
    soundManager.playGoldenChime();

    // After realistic 3D unfolding swing finishes, open content
    setTimeout(() => {
      onOpen();
      setIsOpeningAnimation(false);
    }, 950);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="gatefold-entrance-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#18130E]/85 backdrop-blur-md p-4 overflow-hidden select-none"
        >
          {/* 3D Gatefold Container */}
          <div className="relative w-full max-w-sm sm:max-w-md h-[550px] sm:h-[620px] perspective-1500 flex justify-center items-center">
            
            {/* Ambient Back Glow Behind Gatefold */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10 blur-xl pointer-events-none" />

            {/* RIGHT FLAP (الطية اليمنى) */}
            <motion.div
              id="gatefold-flap-right"
              className="relative w-1/2 h-full bg-[#FAF5EB] linen-texture border-y-2 border-r-2 border-l border-[#D4AF37]/60 rounded-r-2xl shadow-[-8px_0_20px_rgba(0,0,0,0.25)] flex flex-col justify-between p-4 sm:p-6 overflow-hidden origin-right preserve-3d"
              animate={isOpeningAnimation ? { rotateY: 110, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } } : { rotateY: 0 }}
            >
              {/* Gold Filigree Inner Frame */}
              <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/45 pointer-events-none rounded-r-xl">
                <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />
              </div>

              {/* Musnad Vertical Column on Right Outer Edge */}
              <div className="absolute top-6 bottom-6 right-2 sm:right-3 w-8 sm:w-10 pointer-events-none flex flex-col items-center justify-center opacity-70">
                <MusnadColumn showDecorations={true} className="h-full justify-evenly" />
              </div>

              {/* Top Right Header: "أفراح آل سيلان" + الرمز المسندي */}
              <div className="relative z-10 pt-3 pr-8 sm:pr-10 text-right">
                <div className="inline-flex items-center gap-1.5 text-[#D4AF37] mb-1">
                  <span className="text-xs">✦</span>
                  <div className="w-8 h-[1px] bg-[#D4AF37]/50" />
                </div>
                <h2 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#8A6721] drop-shadow-xs leading-normal">
                  أفراح آل سيلان
                </h2>
                <span className="font-mono text-xs tracking-widest text-[#9A7426]/80 block mt-0.5">
                  𐩱𐩫𐩧𐩣
                </span>
              </div>

              {/* Flap content */}
              <div className="flex-1" />
            </motion.div>

            {/* LEFT FLAP (الطية اليسرى) */}
            <motion.div
              id="gatefold-flap-left"
              className="relative w-1/2 h-full bg-[#FAF5EB] linen-texture border-y-2 border-l-2 border-r border-[#D4AF37]/60 rounded-l-2xl shadow-[8px_0_20px_rgba(0,0,0,0.25)] flex flex-col justify-between p-4 sm:p-6 overflow-hidden origin-left preserve-3d"
              animate={isOpeningAnimation ? { rotateY: -110, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } } : { rotateY: 0 }}
            >
              {/* Gold Filigree Inner Frame */}
              <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/45 pointer-events-none rounded-l-xl">
                <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
              </div>

              {/* Musnad Vertical Column on Left Outer Edge */}
              <div className="absolute top-6 bottom-6 left-2 sm:left-3 w-8 sm:w-10 pointer-events-none flex flex-col items-center justify-center opacity-70">
                <MusnadColumn showDecorations={true} className="h-full justify-evenly" />
              </div>

              {/* Left Aesthetic Top */}
              <div className="relative z-10 pt-3 pl-8 sm:pl-10 text-left">
                <div className="inline-flex items-center gap-1.5 text-[#D4AF37] mb-1">
                  <div className="w-8 h-[1px] bg-[#D4AF37]/50" />
                  <span className="text-xs">✦</span>
                </div>
              </div>

              {/* Flap content */}
              <div className="flex-1" />
            </motion.div>

            {/* CENTRAL ROYAL SEAL & COVER DETAILS (خاتم الفتح المذهب) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto flex flex-col items-center">
              
              {/* Cover Central Titles - الاحتفاظ بدعوة زفاف وإزالة اسم العريس كما طُلب */}
              <motion.div 
                animate={isOpeningAnimation ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                className="text-center mb-3 pointer-events-none space-y-1 bg-[#FAF5EB]/95 px-5 py-2.5 rounded-2xl border border-[#D4AF37]/40 shadow-sm"
              >
                <span className="font-mono text-xs tracking-[0.3em] text-[#8A6721] block">
                  𐩱𐩫𐩧𐩣
                </span>
                <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#8A6721] drop-shadow-xs">
                  دَعْــــوَة زَفَـــاف
                </h3>
              </motion.div>

              {/* Interactive Royal Wax Seal Button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleOpenClick}
                animate={isOpeningAnimation ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] } : { scale: [1, 1.03, 1] }}
                transition={isOpeningAnimation ? { duration: 0.7 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-br from-[#FFE7A3] via-[#D4AF37] to-[#8C6212] shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center cursor-pointer group"
              >
                {/* Rotating Gypsum Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FAF6F0]/60 animate-[spin_40s_linear_infinite]" />

                {/* Inner Wax Seal Surface */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FAF5EB] via-[#F3E8CF] to-[#E5D2A8] border-2 border-[#D4AF37] flex flex-col items-center justify-center p-2 text-center shadow-inner">
                  <MailOpen className="w-5 h-5 text-[#8A6721] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-ruqaa text-sm sm:text-base font-bold text-[#2A2219] drop-shadow-xs">
                    انقر لفتح الدعوة ✦
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-cairo text-[#8A6721] mt-0.5">
                    𐩱𐩫𐩧𐩣
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Candle Glow */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#EAB308]/20 blur-md animate-pulse" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A140F]/90 border border-[#D4AF37]/50 text-[#F5D78E] text-[11px] font-cairo shadow-lg -mt-3">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>انقر لفتح الدعوة ✦</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
