import React from 'react';
import { weddingConfig } from '../config/wedding';
import { OrnamentalDivider } from './Ornaments';

export function InvitationSection() {
  const { couple, date, venue } = weddingConfig;

  return (
    <section
      id="invitation"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#32121D] border-t border-[#B99A62]/20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="reveal-section relative border border-[#B99A62]/35 bg-[#491E2C]/45 px-7 py-12 sm:px-14 sm:py-16 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-[#B99A62]/15"
          />

          <div className="relative z-10">
            <p className="font-display text-xs sm:text-sm tracking-[0.28em] uppercase text-[#E8D39D]">
              Together with their loved ones
            </p>

            <h2 className="mt-5 font-script text-4xl sm:text-5xl md:text-6xl text-[#F7F2E8] leading-tight">
              Formal Invitation
            </h2>

            <OrnamentalDivider className="my-7" />

            <div className="space-y-5 max-w-xl mx-auto font-serif text-lg sm:text-xl leading-relaxed text-[#F7F2E8]/90">
              <p>
                With grateful hearts, we joyfully invite you to share in the
                blessing and celebration of the marriage of
              </p>

              <p className="py-2 font-display text-base sm:text-lg tracking-[0.2em] uppercase text-[#E8D39D]">
                {couple.groomName} ({couple.groomTitle}) &amp; {couple.brideName}
              </p>

              <p>
                Your presence, prayers, and warm wishes are deeply cherished as
                we mark this sacred milestone on{' '}
                <span className="text-[#E8D39D] font-medium">
                  {date.displayFull}
                </span>
                .
              </p>

              {!venue.announced && (
                <p className="pt-2 font-serif italic text-base sm:text-lg text-[#F7F2E8]/75">
                  {venue.statusNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
