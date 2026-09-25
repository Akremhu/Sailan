import React from 'react';

/**
 * Authentic Ancient South Arabian Musnad (خط المسند اليمني) & Yemeni Architectural Motifs
 * Rendered with vector precision for crisp gold-foil embossing on cards & borders
 */

// Sabaean / Himyarite Musnad Inscription: "برك / و / سعد / و / خيلن / ل / اكرم / و / ال / سيلن"
// (Blessed, happy, and prosperous for Akram and the House of Saylan)
export const MUSNAD_GLYPHS = [
  { symbol: '𐩨', name: 'Bet (ب)', meaning: 'البركة والبيت' },
  { symbol: '𐩧', name: 'Resh (ر)', meaning: 'الرفعة والريادة' },
  { symbol: '𐩫', name: 'Kaph (ك)', meaning: 'الكرامة والكمال' },
  { symbol: '𐩥', name: 'Waw (و)', meaning: 'الوئام والوفاق' },
  { symbol: '𐩪', name: 'Samekh (س)', meaning: 'السعد والسرور' },
  { symbol: '𐩲', name: 'Ayin (ع)', meaning: 'العزة والعزم' },
  { symbol: '𐩵', name: 'Dal (د)', meaning: 'الدوام والدعة' },
  { symbol: '𐩱', name: 'Aleph (ا)', meaning: 'الأصالة والألفة' },
  { symbol: '𐩡', name: 'Lamed (ل)', meaning: 'اللواء واللمعان' },
  { symbol: '𐩣', name: 'Mem (م)', meaning: 'المحبة والمودة' },
];

export const MusnadColumn: React.FC<{
  className?: string;
  variant?: 'left' | 'right' | 'center';
  showDecorations?: boolean;
}> = ({ className = '', showDecorations = true }) => {
  return (
    <div className={`flex flex-col items-center justify-between py-6 select-none ${className}`}>
      {showDecorations && (
        <svg viewBox="0 0 40 60" className="w-8 h-12 text-[#D4AF37] mb-2 drop-shadow-sm">
          {/* Top finial / Sun motif of Almaqah */}
          <circle cx="20" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 20 4 L 20 10 M 20 26 L 20 32 M 6 18 L 12 18 M 28 18 L 34 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 12 40 L 20 32 L 28 40 L 20 48 Z" fill="currentColor" opacity="0.8" />
          <line x1="20" y1="48" x2="20" y2="60" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}

      {/* Musnad glyphs arranged vertically in embossed golden column */}
      <div className="flex flex-col items-center gap-4 text-[#C5A059] font-bold text-2xl tracking-widest font-mono">
        {MUSNAD_GLYPHS.map((item, idx) => (
          <div
            key={idx}
            className="group relative cursor-default transition-all duration-300 hover:text-[#D4AF37] hover:scale-125"
            title={`${item.symbol} - ${item.name}: ${item.meaning}`}
          >
            <span className="block drop-shadow-[0_1px_2px_rgba(212,175,55,0.4)]">
              {item.symbol}
            </span>
            {/* Small decorative separator between every 2 letters */}
            {idx % 2 === 1 && idx !== MUSNAD_GLYPHS.length - 1 && (
              <span className="block w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/60 bg-[#D4AF37]/30 my-1 mx-auto" />
            )}
          </div>
        ))}
      </div>

      {showDecorations && (
        <svg viewBox="0 0 40 50" className="w-8 h-10 text-[#D4AF37] mt-3 drop-shadow-sm">
          <line x1="20" y1="0" x2="20" y2="15" stroke="currentColor" strokeWidth="2" />
          <polygon points="20,15 12,28 28,28" fill="currentColor" opacity="0.85" />
          <circle cx="20" cy="38" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="38" r="2" fill="currentColor" />
        </svg>
      )}
    </div>
  );
};

/**
 * Traditional Sana'ani Qamariya (قمرية صنعانية)
 * Classic Yemeni half-circle arch with ornate gypsum openwork tracery and stained glass
 */
export const QamariyaArch: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 280,
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 165"
        width={size}
        height={size * 0.55}
        className="overflow-visible drop-shadow-[0_4px_12px_rgba(180,130,30,0.25)]"
      >
        <defs>
          <linearGradient id="qamariyaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#92620E" />
          </linearGradient>

          {/* Stained glass glows */}
          <radialGradient id="glassAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="glassEmerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.45" />
          </radialGradient>
          <radialGradient id="glassRuby" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="glassAzure" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Outer Semi-Circle Frame */}
        <path
          d="M 15 150 A 135 135 0 0 1 285 150 Z"
          fill="#FAF5EB"
          stroke="url(#qamariyaGold)"
          strokeWidth="6"
        />

        {/* Inner Colored Glass Segments (The Yemeni Qamariya Fan) */}
        {/* Segment 1: Ruby */}
        <path d="M 150 150 L 35 150 A 115 115 0 0 1 50 100 Z" fill="url(#glassRuby)" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Segment 2: Emerald */}
        <path d="M 150 150 L 50 100 A 115 115 0 0 1 85 62 Z" fill="url(#glassEmerald)" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Segment 3: Amber */}
        <path d="M 150 150 L 85 62 A 115 115 0 0 1 130 40 Z" fill="url(#glassAmber)" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Segment 4: Azure Center */}
        <path d="M 150 150 L 130 40 A 115 115 0 0 1 170 40 Z" fill="url(#glassAzure)" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Segment 5: Amber */}
        <path d="M 150 150 L 170 40 A 115 115 0 0 1 215 62 Z" fill="url(#glassAmber)" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Segment 6: Emerald */}
        <path d="M 150 150 L 215 62 A 115 115 0 0 1 250 100 Z" fill="url(#glassEmerald)" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Segment 7: Ruby */}
        <path d="M 150 150 L 250 100 A 115 115 0 0 1 265 150 Z" fill="url(#glassRuby)" stroke="#D4AF37" strokeWidth="1.5" />

        {/* Central rosette arc */}
        <path
          d="M 100 150 A 50 50 0 0 1 200 150 Z"
          fill="#FAF5EB"
          stroke="url(#qamariyaGold)"
          strokeWidth="3"
        />

        {/* Traditional Petals Inside Rosette */}
        <circle cx="150" cy="150" r="22" fill="url(#glassAmber)" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="150" cy="150" r="10" fill="#D4AF37" />

        {/* White plaster openwork / Gypsum fretwork tracery */}
        <path
          d="M 15 150 L 285 150"
          stroke="url(#qamariyaGold)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Decorative dentils at bottom */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x={28 + i * 18}
            y="152"
            width="8"
            height="5"
            fill="#D4AF37"
            rx="1"
          />
        ))}
      </svg>
    </div>
  );
};

/**
 * Traditional Yemeni Janbiya Emblem (شعار الجنبية اليمنية الأصيلة)
 */
export const JanbiyaEmblem: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`inline-block ${className}`}
    >
      <defs>
        <linearGradient id="goldHilt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6316" />
        </linearGradient>
      </defs>

      {/* Janbiya Hilt (رأس الصيفاني الملكي) */}
      <path
        d="M 40 12 L 60 12 C 63 12 65 15 64 19 L 60 30 C 58 35 62 38 65 42 L 65 46 L 35 46 L 35 42 C 38 38 42 35 40 30 L 36 19 C 35 15 37 12 40 12 Z"
        fill="url(#goldHilt)"
        stroke="#6B4708"
        strokeWidth="1.5"
      />
      {/* Two golden coins / rivets (الزهرتين في رأس الجنبية) */}
      <circle cx="45" cy="22" r="3.5" fill="#FFE58F" stroke="#8C6316" strokeWidth="1" />
      <circle cx="55" cy="22" r="3.5" fill="#FFE58F" stroke="#8C6316" strokeWidth="1" />

      {/* Ornate Belt Mount (المبسم والزنار) */}
      <rect x="33" y="46" width="34" height="6" rx="2" fill="#0F382A" stroke="#D4AF37" strokeWidth="1" />
      <line x1="33" y1="49" x2="67" y2="49" stroke="#FFE58F" strokeWidth="1.5" />

      {/* Curved Scabbard (غمد الجنبية المعقوف التقليدي الصنعاني) */}
      <path
        d="M 37 52 C 37 68 45 80 62 88 C 70 92 82 92 86 86 C 89 82 85 75 78 72 C 65 67 55 60 51 52 Z"
        fill="url(#goldHilt)"
        stroke="#6B4708"
        strokeWidth="1.5"
      />

      {/* Traditional filigree carvings on scabbard */}
      <path
        d="M 43 60 C 47 70 54 78 68 83"
        fill="none"
        stroke="#FFE58F"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  );
};

/**
 * Ornate Calligraphic Ribbon & Divider with Diamond Ornaments
 */
export const LuxuryDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 select-none ${className}`}>
      <div className="h-px bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37] flex-1 max-w-[120px]" />
      <div className="flex items-center gap-1.5 text-[#D4AF37]">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/50" />
        <span className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/30" />
        <span className="w-3.5 h-3.5 rotate-45 border-2 border-[#D4AF37] bg-gradient-to-br from-[#FDF0CD] to-[#AA7C11] shadow-sm" />
        <span className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/30" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/50" />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37] flex-1 max-w-[120px]" />
    </div>
  );
};
