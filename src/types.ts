export interface WeddingProfile {
  id: string;
  familyTitle: string;
  hostStatement: string;
  groomShortName: string;
  groomFullName: string;
  occasionName: string;
  dateTimeBadge: string;
  timeBadge: string;
  venueName: string;
  venueCity: string;
  googleMapsQuery: string;
  welcomeVerseLines: string[];
  contactPhone: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface TimelineItem {
  id: string;
  time: string;
  period: string;
  title: string;
  description: string;
  badge: string;
  iconName: 'users' | 'coffee' | 'utensils' | 'music';
}
