/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GatefoldEntrance } from './components/GatefoldEntrance';
import { HeaderNav } from './components/HeaderNav';
import { ContinuousInvitation } from './components/ContinuousInvitation';
import { AmbientGoldDust } from './components/AmbientGoldDust';
import { LuxuryDivider, MUSNAD_GLYPHS } from './components/MusnadPattern';
import { soundManager } from './utils/audio';
import { Heart, Sparkles } from 'lucide-react';
import { SAYLAN_WEDDING_PROFILE } from './data/weddingProfiles';

// Wedding Date: Thursday, 15 October 2026 at 1:30 PM (Sana'a UTC+3)
const TARGET_WEDDING_DATE = new Date('2026-10-15T13:30:00+03:00');

export default function App() {
  const [isGatefoldOpen, setIsGatefoldOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const profile = SAYLAN_WEDDING_PROFILE;

  const handleOpenGatefold = () => {
    setIsGatefoldOpen(true);
  };

  const handleRefoldGatefold = () => {
    setIsGatefoldOpen(false);
    window.scrollTo({ top: 0 });
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] paper-texture text-[#2C241E] font-cairo selection:bg-[#D4AF37]/30 selection:text-[#0F382A] relative overflow-x-hidden">
      
      {/* 1) 3D Gatefold Entrance Cover (Overlay until opened) */}
      <GatefoldEntrance
        isOpen={isGatefoldOpen}
        onOpen={handleOpenGatefold}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* 2) Inner Wedding Invitation Experience */}
      <div className={`transition-opacity duration-1000 ${isGatefoldOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Ambient Golden Particles Layer */}
        {isGatefoldOpen && <AmbientGoldDust />}

        {/* Floating Top Controls Bar */}
        <HeaderNav
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onRefoldGatefold={handleRefoldGatefold}
        />

        <main className="pb-16 pt-2">
          {/* Unified Continuous Scroll Invitation (دعوة واحدة متصلة بجميع الأقسام بالترتيب) */}
          <ContinuousInvitation targetDate={TARGET_WEDDING_DATE} />
        </main>

        {/* Majestic Heritage Footer */}
        <footer className="w-full bg-[#1F1914] text-[#FAF5EB] py-12 px-4 border-t-2 border-[#D4AF37]/50 relative overflow-hidden">
          {/* Subtle Musnad Band in Background */}
          <div className="absolute inset-x-0 top-2 flex justify-center gap-4 text-[#D4AF37]/15 font-mono text-sm select-none pointer-events-none overflow-hidden">
            {MUSNAD_GLYPHS.concat(MUSNAD_GLYPHS).map((g, i) => (
              <span key={i}>{g.symbol}</span>
            ))}
          </div>

          <div className="max-w-md mx-auto text-center relative z-10 space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 mx-auto flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#F5E6BE] drop-shadow-sm leading-normal">
              أفراح آل سيلان
            </h3>

            <p className="font-amiri text-lg sm:text-xl text-[#D4AF37] leading-[2]">
              "دامت دياركم عامرة بالأفراح والمسرات"
            </p>

            <p className="text-xs sm:text-sm text-[#A89887] max-w-sm mx-auto leading-[1.8] font-cairo">
              نسأل الله تعالى أن يبارك للعريس وأن يرزقه السعادة وراحة البال والذرية الصالحة.
            </p>

            <LuxuryDivider className="max-w-xs mx-auto opacity-70 my-4" />

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A89887] pt-2 font-cairo">
              <span>صُممت بكل حُب واعتزاز</span>
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>2026</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
