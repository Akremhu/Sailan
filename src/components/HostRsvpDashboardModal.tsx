import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, UserCheck, UserX, Download, KeyRound, X, FileSpreadsheet, Lock } from 'lucide-react';
import { rsvpStorage, RsvpEntry } from '../utils/rsvpStorage';
import { soundManager } from '../utils/audio';

interface HostRsvpDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostRsvpDashboardModal: React.FC<HostRsvpDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [entries, setEntries] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Check if URL has ?admin=saylan or admin token
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'saylan' || urlParams.get('host') === '1') {
        setIsAuthenticated(true);
      }
      setEntries(rsvpStorage.getEntries());
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Host Passcode is 2026 or saylan
    if (passcode.trim() === '2026' || passcode.trim().toLowerCase() === 'saylan') {
      soundManager.playClickTone();
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('رمز المرور غير صحيح. جرب 2026');
    }
  };

  const totalAttendees = entries
    .filter(e => e.attendance === 'yes')
    .reduce((acc, curr) => acc + (Number(curr.guestCount) || 1), 0);
  const totalAttendingGuests = entries.filter(e => e.attendance === 'yes').length;
  const totalApologies = entries.filter(e => e.attendance === 'apologies').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border-2 border-[#D4AF37]/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0F382A] via-[#164736] to-[#0F382A] text-[#FAF5EB] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-ruqaa text-lg sm:text-xl font-bold">
                    سجل تأكيد الحضور الخاص بأسرة العريس
                  </h3>
                  <p className="font-cairo text-[11px] text-[#D4AF37]">
                    خاص بك فقط (لا يظهر للحضور)
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5EB] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/50 text-[#8A6721] flex items-center justify-center mx-auto">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-cairo font-bold text-base text-[#2C241E]">
                    إدخال رمز الدخول السري
                  </h4>
                  <p className="font-cairo text-xs text-[#6D5222]">
                    هذا القسم سري لعائلة العريس لمعرفة تفاصيل وأعداد الحاضرين
                  </p>
                </div>

                <div className="max-w-xs mx-auto space-y-2">
                  <input
                    type="password"
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="رمز المرور (رمزك: 2026)..."
                    className="w-full text-center px-4 py-2.5 rounded-xl bg-white border border-[#D4AF37]/50 font-cairo text-sm text-[#2C241E] focus:outline-none focus:border-[#0F382A]"
                  />
                  {errorMsg && <p className="text-xs text-rose-600 font-cairo">{errorMsg}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full max-w-xs py-2.5 rounded-xl bg-[#0F382A] text-white font-cairo font-bold text-xs hover:bg-[#154a37] transition-all cursor-pointer"
                >
                  فتح السجل
                </button>
              </form>
            ) : (
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-2xs">
                    <span className="text-[11px] font-cairo text-[#6D5222] font-semibold block">إجمالي الأشخاص</span>
                    <span className="font-cairo font-black text-xl sm:text-2xl text-[#0F382A]">{totalAttendees}</span>
                    <span className="text-[10px] text-neutral-400 block font-cairo">فرد حاضر</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-2xs">
                    <span className="text-[11px] font-cairo text-[#6D5222] font-semibold block">التأكيدات</span>
                    <span className="font-cairo font-black text-xl sm:text-2xl text-emerald-700">{totalAttendingGuests}</span>
                    <span className="text-[10px] text-neutral-400 block font-cairo">بطاقة مؤكدة</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-2xs">
                    <span className="text-[11px] font-cairo text-[#6D5222] font-semibold block">الاعتذارات</span>
                    <span className="font-cairo font-black text-xl sm:text-2xl text-amber-700">{totalApologies}</span>
                    <span className="text-[10px] text-neutral-400 block font-cairo">معتذر</span>
                  </div>
                </div>

                {/* Google Sheets / Excel Export Action */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF5EB] border border-[#D4AF37]/45">
                  <div className="flex items-center gap-2 text-xs font-cairo text-[#4A3816]">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="font-bold block">تحميل البيانات لـ Excel / Google Sheets</span>
                      <span className="text-[10px] text-[#7A6128]">ملف CSV متوافق تماماً مع جداول جوجل</span>
                    </div>
                  </div>
                  <button
                    onClick={() => rsvpStorage.exportToCSV()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F382A] hover:bg-[#154a37] text-white text-xs font-cairo font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>تصدير CSV</span>
                  </button>
                </div>

                {/* Table of submissions */}
                <div className="space-y-2">
                  <h4 className="font-cairo font-bold text-xs text-[#2C241E] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#8A6721]" />
                    <span>قائمة الضيوف الذين سجلوا ({entries.length})</span>
                  </h4>

                  {entries.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-400 font-cairo bg-white rounded-2xl border border-dashed border-[#D4AF37]/40">
                      لم يتم تسجيل أي ردود حتى الآن
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="p-3 rounded-xl bg-white border border-[#D4AF37]/30 flex items-center justify-between text-xs font-cairo shadow-2xs hover:border-[#D4AF37] transition-all"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#2C241E] flex items-center gap-1.5">
                              {entry.attendance === 'yes' ? (
                                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <UserX className="w-3.5 h-3.5 text-amber-600" />
                              )}
                              <span>{entry.name}</span>
                            </div>
                            <span className="text-[10px] text-[#8C6D38]">
                              {new Date(entry.submittedAt).toLocaleDateString('ar-YE', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>

                          <div className="text-left">
                            {entry.attendance === 'yes' ? (
                              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                                سيحضر ({entry.guestCount} {entry.guestCount === 1 ? 'فرد' : 'أفراد'})
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200 text-[11px]">
                                معتذر
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Secret link tip for the user */}
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] font-cairo text-amber-900 leading-relaxed">
                  💡 <strong>رابطك المباشر كصاحب الفرح:</strong> يمكنك فتح الرابط مضيفاً له <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 text-emerald-800 font-mono text-[10px]">?admin=saylan</code> لفتح هذا السجل فوراً دون الحاجة لكلمة المرور.
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
