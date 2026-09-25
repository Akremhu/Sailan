export interface RsvpEntry {
  id: string;
  name: string;
  attendance: 'yes' | 'apologies';
  guestCount: number;
  submittedAt: string;
}

const STORAGE_KEY = 'alsaylan_wedding_rsvp_list_v1';

export const rsvpStorage = {
  getEntries(): RsvpEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initial sample seed so the host can test dashboard immediately
        const defaultSeeds: RsvpEntry[] = [
          {
            id: 'seed-1',
            name: 'المهندس محمد سيلان',
            attendance: 'yes',
            guestCount: 2,
            submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
          {
            id: 'seed-2',
            name: 'الأستاذ أحمد الحاوري',
            attendance: 'yes',
            guestCount: 3,
            submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSeeds));
        return defaultSeeds;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  addEntry(entry: Omit<RsvpEntry, 'id' | 'submittedAt'>): RsvpEntry {
    const entries = this.getEntries();
    const newEntry: RsvpEntry = {
      ...entry,
      id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return newEntry;
  },

  exportToCSV(): void {
    const entries = this.getEntries();
    const headers = ['الاسم الكريم', 'حالة الحضور', 'عدد المرافقين', 'تاريخ ووقت التأكيد'];
    const rows = entries.map(e => [
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.attendance === 'yes' ? 'مؤكد الحضور' : 'معتذر'}"`,
      e.attendance === 'yes' ? e.guestCount : 0,
      `"${new Date(e.submittedAt).toLocaleString('ar-YE')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `تاكيد_حضور_زفاف_الدكتور_اكرم_سيلان_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};
