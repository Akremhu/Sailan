import React from 'react';

/**
 * Ambient Golden Sparkle Dust
 * Creates a subtle, magical golden particles layer rising softly in the background.
 */
export const AmbientGoldDust: React.FC = () => {
  const particles = [
    { top: '12%', left: '8%', size: '4px', delay: '0s', duration: '7s' },
    { top: '22%', right: '10%', size: '5px', delay: '1.5s', duration: '9s' },
    { top: '35%', left: '15%', size: '3px', delay: '3s', duration: '8s' },
    { top: '48%', right: '12%', size: '6px', delay: '0.8s', duration: '10s' },
    { top: '62%', left: '10%', size: '4px', delay: '2.2s', duration: '8.5s' },
    { top: '75%', right: '14%', size: '5px', delay: '4s', duration: '7.5s' },
    { top: '88%', left: '18%', size: '3px', delay: '1s', duration: '9.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className="ambient-sparkle"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};
