import React, { useState } from 'react';
import { Share2, Mail, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { copyTextToClipboard } from '../utils/clipboard';

interface HeaderNavProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onRefoldGatefold: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onRefoldGatefold,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    soundManager.playClickTone();
    const shareData = {
      title: 'دعوة زفاف الدكتور أكرم سيلان | أفراح آل سيلان',
      text: 'يتشرف الحاج عبدالخالق سيلان وأولاده بدعوتكم لحضور زفاف نجلهم الغالي الدكتور أكرم سيلان. المناسبة: المقيل والزفة | الخميس 15 / 10 / 2026 م ابتداءً من الساعة 1:30 ظهراً في صالة بيت سيلان - خمر. وبحضوركم يتم لنا الفرح والسرور.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled or share failed, fallback to copy
        await copyToClipboard();
      }
    } else {
      await copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    await copyTextToClipboard(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <header id="top-floating-bar" className="sticky top-2 z-40 px-3 sm:px-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FAF5EB]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_4px_16px_rgba(44,36,30,0.06)] transition-all">
          {/* Right: Re-fold Envelope Pill */}
          <button
            id="refold-gatefold-btn"
            onClick={() => {
              soundManager.playClickTone();
              onRefoldGatefold();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 hover:bg-[#FAF6F0] border border-[#D4AF37]/30 text-[#6D5222] text-[11px] sm:text-xs font-cairo font-semibold transition-all shadow-2xs hover:border-[#D4AF37]/60 active:scale-95"
            title="إعادة إغلاق الغلاف الملكي"
          >
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden xs:inline">إغلاق الغلاف</span>
          </button>

          {/* Center Title Badge */}
          <div className="flex items-center gap-1.5 text-center px-2">
            <span className="text-[10px] text-[#D4AF37]">✦</span>
            <span className="font-ruqaa text-sm sm:text-base font-bold text-[#2C241E] tracking-wide">
              أفراح آل سيلان
            </span>
            <span className="text-[10px] text-[#D4AF37]">✦</span>
          </div>

          {/* Left: Compact Action Controls (Keeping Share and Re-fold as requested) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Share Button */}
            <button
              id="share-invitation-btn"
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0F382A] text-[#FAF5EB] text-[11px] sm:text-xs font-cairo font-semibold shadow-xs hover:bg-[#144A38] transition-all active:scale-95"
              title="مشاركة رابط الدعوة"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span className="inline">{copied ? 'تم النسخ' : 'مشاركة'}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
