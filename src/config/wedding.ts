export interface ProgrammeItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
}

export interface GuestInfoItem {
  title: string;
  detail: string;
}

export interface ContactPerson {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
}

export interface WeddingConfig {
  couple: {
    groomName: string;
    groomTitle: string;
    brideName: string;
    monogram: string;
    photoPath: string;
    photoFallbackPath: string;
  };
  date: {
    displayFull: string;
    displayUpper: string;
    displayShort: string;
    isoTarget: string;
    icsStartDate: string;
    icsEndDate: string;
  };
  venue: {
    announced: boolean;
    statusLabel: string;
    statusNote: string;
    name?: string;
    address?: string;
    city?: string;
    directions?: string;
    mapUrl?: string;
  };
  programme: ProgrammeItem[];
  rsvp: {
    enabled: boolean;
    endpoint?: string;
    deadline?: string;
    externalUrl?: string;
  };
  guestInfo: GuestInfoItem[];
  contacts: ContactPerson[];
  audio: {
    src: string | null;
    title?: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groomName: 'Muhammad',
    groomTitle: 'WAKILI',
    brideName: 'Nabeela',
    monogram: 'M & N',
    photoPath: '/assets/aistudio/wakiliiiii_e66f2bb8.jpeg',
    photoFallbackPath: '/assets/images/couple.jpg',
  },
  date: {
    displayFull: 'Saturday, 26 December 2026',
    displayUpper: 'SATURDAY, 26 DECEMBER 2026',
    displayShort: '26 December 2026',
    isoTarget: '2026-12-26T00:00:00',
    icsStartDate: '20261226',
    icsEndDate: '20261227',
  },
  venue: {
    announced: false,
    statusLabel: 'To Be Announced',
    statusNote: 'Venue details will be communicated soon.',
  },
  programme: [],
  rsvp: {
    enabled: false,
  },
  guestInfo: [],
  contacts: [],
  audio: {
    // Supply a public audio path (e.g. '/assets/audio/wedding-theme.mp3') when ready.
    src: null,
  },
};

export function downloadWeddingCalendarInvite(): void {
  const { couple, date, venue } = weddingConfig;
  const locationLine =
    venue.announced && venue.name
      ? `${venue.name}${venue.address ? `, ${venue.address}` : ''}`
      : 'To Be Announced (Venue details will be communicated soon)';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Muhammad Wakili and Nabeela//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-muhammad-wakili-nabeela-20261226@invitation`,
    `DTSTAMP:20260101T000000Z`,
    `DTSTART;VALUE=DATE:${date.icsStartDate}`,
    `DTEND;VALUE=DATE:${date.icsEndDate}`,
    `SUMMARY:Wedding of ${couple.groomName} (${couple.groomTitle}) & ${couple.brideName}`,
    `DESCRIPTION:Celebrating the wedding of ${couple.groomName} (${couple.groomTitle}) & ${couple.brideName}. ${venue.statusNote}`,
    `LOCATION:${locationLine}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Muhammad-Wakili-and-Nabeela-Wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
