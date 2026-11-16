import React, { useEffect, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import { weddingConfig, downloadWeddingCalendarInvite } from '../config/wedding';
import { OrnamentalDivider } from './Ornaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: 'upcoming' | 'today' | 'past';
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const now = new Date();
  const target = new Date(targetIso);
  const diff = target.getTime() - now.getTime();

  const isSameCalendarDay =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate();

  if (isSameCalendarDay) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'today' };
  }

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'past' };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, status: 'upcoming' };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function CountdownSection() {
  const { date } = weddingConfig;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(date.isoTarget)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(date.isoTarget));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [date.isoTarget]);

  const units = [
    { label: 'Days', value: String(timeLeft.days) },
    { label: 'Hours', value: padTwo(timeLeft.hours) },
    { label: 'Minutes', value: padTwo(timeLeft.minutes) },
    { label: 'Seconds', value: padTwo(timeLeft.seconds) },
  ];

  return (
    <section
      id="date"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#32121D] border-t border-[#B99A62]/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="reveal-section">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            Save the Date
          </p>

          <h2 className="mt-4 font-display text-2xl sm:text-4xl md:text-[2.75rem] tracking-[0.16em] text-[#F7F2E8] leading-snug">
            {date.displayUpper}
          </h2>

          <OrnamentalDivider className="my-7" />

          {/* Countdown Grid */}
          {timeLeft.status === 'upcoming' && (
            <div
              role="timer"
              aria-live="off"
              aria-label="Countdown to Saturday, 26 December 2026"
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-2xl mx-auto"
            >
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="border border-[#B99A62]/35 bg-[#491E2C]/55 px-4 py-6 sm:py-8 flex flex-col items-center justify-center"
                >
                  <span className="font-display tabular-nums text-3xl sm:text-5xl text-[#E8D39D] leading-none">
                    {unit.value}
                  </span>
                  <span className="mt-3 font-display text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#F7F2E8]/80">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {timeLeft.status === 'today' && (
            <div className="mt-8 border border-[#E8D39D]/45 bg-[#491E2C]/60 px-6 py-8 max-w-lg mx-auto">
              <p className="font-script text-4xl sm:text-5xl text-[#E8D39D]">
                Today is the Celebration
              </p>
              <p className="mt-2 font-serif text-lg text-[#F7F2E8]/85">
                {date.displayFull}
              </p>
            </div>
          )}

          {timeLeft.status === 'past' && (
            <div className="mt-8 border border-[#B99A62]/40 bg-[#491E2C]/55 px-6 py-8 max-w-lg mx-auto">
              <p className="font-script text-4xl sm:text-5xl text-[#E8D39D]">
                Joyfully Celebrated
              </p>
              <p className="mt-2 font-serif text-lg text-[#F7F2E8]/85">
                {date.displayFull}
              </p>
            </div>
          )}

          <div className="mt-10">
            <button
              type="button"
              onClick={downloadWeddingCalendarInvite}
              className="inline-flex items-center gap-2.5 min-h-[44px] px-7 py-3 border border-[#B99A62]/70 bg-transparent hover:bg-[#E8D39D] text-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
