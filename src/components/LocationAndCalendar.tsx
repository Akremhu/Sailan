import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, CalendarPlus, Navigation, Copy, Check, Car, ExternalLink, Clock } from 'lucide-react';
import { LuxuryDivider } from './MusnadPattern';
import { copyTextToClipboard } from '../utils/clipboard';

export const LocationAndCalendar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const venueName = 'قاعة بيت سيلان الخيرية';
  const venueAddress = 'بيت سيلان - خمر';
  
  // Google Maps Search link for "قاعة بيت سيلان الخيرية"
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('قاعة بيت سيلان الخيرية خمر عمران اليمن')}`;

  // Google Calendar Event Link
  // Target: Thursday, 15 October 2026 at 1:30 PM (Sana'a UTC+3)
  const eventDetails = {
    title: 'حفل زفاف الدكتور أكرم سيلان | أفراح آل سيلان',
    details: 'يتشرف الحاج عبدالخالق سيلان وأولاده بدعوتكم لحضور زفاف نجلهم الغالي الدكتور أكرم سيلان. المناسبة: المقيل والزفة | الخميس 15 / 10 / 2026 م ابتداءً من الساعة 1:30 ظهراً في قاعة بيت سيلان الخيرية - خمر. وبحضوركم يتم لنا الفرح والسرور.',
    location: `${venueName}، ${venueAddress}`,
    dates: '20261015T103000Z/20261015T210000Z',
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(
    eventDetails.location
  )}&dates=${eventDetails.dates}`;

  const handleCopyAddress = async () => {
    await copyTextToClipboard(`${venueName} - ${venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AlSaylan Wedding//Wedding Invitation//AR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-dr-akrem-saylan-20260915@alsaylan.com',
      'DTSTAMP:20260915T000000Z',
      'DTSTART:20260915T130000Z',
      'DTEND:20260915T210000Z',
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.details}`,
      `LOCATION:${eventDetails.location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-dr-akrem-saylan-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="location-calendar-section" className="w-full max-w-3xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <h3 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E] leading-normal">
          موقع القاعة وموعد المناسبة
        </h3>
        <p className="font-cairo text-xs sm:text-sm text-[#8C6D38] mt-1.5 font-medium">
          يسعدنا تيسير وصولكم وحفظ الموعد في جدولكم الخاص
        </p>
        <LuxuryDivider className="max-w-xs mx-auto mt-3" />
      </div>

      {/* Main Venue Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF5EB] border-2 border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(212,175,55,0.08)] relative overflow-hidden">
        {/* Subtle Decorative Arch in background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#D4AF37]/15 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F382A]/10 text-[#0F382A] text-xs font-bold font-cairo mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مكان الحفل المبارك</span>
            </div>

            <h4 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#2C241E] mb-1 leading-normal">
              {venueName}
            </h4>

            <p className="font-cairo text-sm font-bold text-[#0F382A] mb-3">
              {venueAddress}
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8C6D38] font-cairo font-bold mb-4 justify-center md:justify-start">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>المقيل والزفة والعشاء | الخميس 15 / 9 / 2026 م | ابتداءً من الساعة 4:00 عصراً</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                id="copy-address-btn"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#D4AF37]/40 text-[#6D5222] text-xs font-semibold hover:border-[#D4AF37] transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                <span>{copied ? 'تم نسخ العنوان' : 'نسخ العنوان'}</span>
              </button>

              <div className="inline-flex items-center gap-1 text-[11px] text-[#0F382A] font-cairo bg-[#FAF6F0] px-2.5 py-1.5 rounded-xl border border-[#0F382A]/20">
                <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>مواقف مخصصة متوفرة</span>
              </div>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-col gap-3 w-full md:w-auto min-w-[220px]">
            {/* Maps Button */}
            <a
              id="google-maps-btn"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0F382A] to-[#1E4D3B] text-[#FDFBF7] font-cairo font-bold text-sm shadow-md hover:shadow-lg hover:from-[#144A38] hover:to-[#255E49] transition-all group"
            >
              <Navigation className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>موقع القاعة على Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Calendar Button (Google Calendar) */}
            <a
              id="add-google-calendar-btn"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F4E9D0] to-[#E9D6AF] text-[#4A3816] border border-[#D4AF37]/60 font-cairo font-bold text-sm shadow-xs hover:border-[#D4AF37] hover:shadow-md transition-all group"
            >
              <CalendarPlus className="w-4 h-4 text-[#8A6721] group-hover:scale-110 transition-transform" />
              <span>أضف الموعد إلى التقويم</span>
            </a>

            {/* Download .ICS file */}
            <button
              id="download-ics-btn"
              onClick={handleDownloadICS}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6F0] border border-[#D4AF37]/35 text-[#6D5222] text-xs font-cairo font-semibold hover:bg-[#F4E9D0] transition-colors"
            >
              <span>تنزيل ملف التقويم للهواتف (iCal)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
