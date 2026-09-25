import React from 'react';
import { motion } from 'motion/react';
import { Users, Coffee, Utensils, Music, Clock } from 'lucide-react';
import { TimelineItem } from '../types';
import { LuxuryDivider } from './MusnadPattern';

const timelineEvents: TimelineItem[] = [
  {
    id: 'maqil',
    time: '04:00',
    period: 'عصراً',
    title: 'استقبال المهنئين وبدء جلسة المقيل التراثية',
    description: 'استقبال الوفود والضيوف الكرام بالبخور الصنعاني ومراسم الترحيب اليمني الأصيل، وبدء جلسة المقيل وأهازيج التراث وزوامل آل سيلان.',
    badge: 'المقيل والسمرة',
    iconName: 'coffee',
  },
  {
    id: 'dinner',
    time: '07:30',
    period: 'مساءً',
    title: 'مأدبة العشاء الفاخرة',
    description: 'تناول طعام العشاء المعد تكريماً لجميع الحاضرين والمهنئين في أجواء من الألفة والمحبة والبهجة.',
    badge: 'طعام العشاء',
    iconName: 'utensils',
  },
  {
    id: 'zaffah',
    time: '09:00',
    period: 'مساءً',
    title: 'الزفة الصنعانية ومراسم التهاني والتوديع',
    description: 'موكب الزفة التراثية اليمنية المهيبة للعريس الغالي الدكتور أكرم سيلان بمشاركة الأهل والأصحاب على أنغام الأناشيد الشعبية.',
    badge: 'الزفة المباركة',
    iconName: 'music',
  },
];

const renderIcon = (name: TimelineItem['iconName']) => {
  const props = { className: 'w-5 h-5 text-[#8A6721]' };
  switch (name) {
    case 'users':
      return <Users {...props} />;
    case 'coffee':
      return <Coffee {...props} />;
    case 'utensils':
      return <Utensils {...props} />;
    case 'music':
      return <Music {...props} />;
  }
};

export const EventTimeline: React.FC = () => {
  return (
    <section id="timeline-section" className="w-full max-w-3xl mx-auto my-12 px-4">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#2C241E] leading-normal">
          برنامج المناسبة: المقيل والزفة والعشاء
        </h3>
        <p className="font-plex text-xs sm:text-sm text-[#8C6D38] mt-1.5 font-normal">
          الثلاثاء | 15 / 9 / 2026 م - قاعة بيت سيلان الخيرية
        </p>
        <LuxuryDivider className="max-w-xs mx-auto mt-3" />
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative border-r-2 border-[#D4AF37]/40 mr-4 sm:mr-8 pr-6 sm:pr-8 space-y-8">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative group"
          >
            {/* Timeline Node Ring */}
            <div className="absolute -right-[35px] sm:-right-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF5EB] border-2 border-[#D4AF37] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-[#D4AF37] transition-all">
              <div className="w-2.5 h-2.5 rounded-full bg-[#8A6721] group-hover:bg-[#FAF5EB]" />
            </div>

            {/* Event Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF5EB] border border-[#D4AF37]/35 shadow-2xs hover:border-[#D4AF37] transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                {/* Time Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/35 text-[#6D5222]">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-plex font-medium text-xs sm:text-sm">
                    {event.time} {event.period}
                  </span>
                </div>

                {/* Event Category Badge */}
                {event.badge && (
                  <span className="text-xs font-plex text-[#0F382A] bg-[#0F382A]/8 px-2.5 py-0.5 rounded-md border border-[#0F382A]/15 font-medium">
                    {event.badge}
                  </span>
                )}
              </div>

              {/* Title with Icon */}
              <div className="flex items-center gap-2 mt-2">
                {renderIcon(event.iconName)}
                <h4 className="font-amiri text-lg sm:text-xl font-bold text-[#2C241E]">
                  {event.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#54463A] font-plex leading-relaxed mt-2">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
