import React from 'react';
import { MapPin } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { OrnamentalDivider } from './Ornaments';

export function DetailsSection() {
  const { couple, date, venue } = weddingConfig;

  return (
    <section
      id="details"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#491E2C] stationery-grain border-t border-[#B99A62]/20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="reveal-section text-center mb-12 sm:mb-14">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            Celebration Ledger
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl md:text-6xl text-[#F7F2E8]">
            Wedding Details
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        {/* Architectural Stationery Definition List */}
        <div className="reveal-section border border-[#B99A62]/35 bg-[#32121D]/65 px-6 sm:px-12 py-4 sm:py-6">
          <dl className="divide-y divide-[#B99A62]/20">
            <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
              <dt className="sm:col-span-4 font-display text-xs tracking-[0.22em] uppercase text-[#E8D39D]">
                Groom
              </dt>
              <dd className="sm:col-span-8 font-serif text-xl sm:text-2xl text-[#F7F2E8]">
                {couple.groomName}{' '}
                <span className="font-display text-sm tracking-[0.2em] text-[#E8D39D] ml-1">
                  ({couple.groomTitle})
                </span>
              </dd>
            </div>

            <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
              <dt className="sm:col-span-4 font-display text-xs tracking-[0.22em] uppercase text-[#E8D39D]">
                Bride
              </dt>
              <dd className="sm:col-span-8 font-serif text-xl sm:text-2xl text-[#F7F2E8]">
                {couple.brideName}
              </dd>
            </div>

            <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
              <dt className="sm:col-span-4 font-display text-xs tracking-[0.22em] uppercase text-[#E8D39D]">
                Date
              </dt>
              <dd className="sm:col-span-8 font-serif text-xl sm:text-2xl text-[#F7F2E8]">
                {date.displayFull}
              </dd>
            </div>

            <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start">
              <dt className="sm:col-span-4 font-display text-xs tracking-[0.22em] uppercase text-[#E8D39D] sm:pt-1">
                Venue
              </dt>
              <dd className="sm:col-span-8">
                {venue.announced && venue.name ? (
                  <div className="space-y-2">
                    <p className="font-serif text-xl sm:text-2xl text-[#F7F2E8]">
                      {venue.name}
                    </p>
                    {venue.address && (
                      <p className="font-serif text-base sm:text-lg text-[#F7F2E8]/80">
                        {venue.address}
                        {venue.city ? `, ${venue.city}` : ''}
                      </p>
                    )}
                    {venue.directions && (
                      <p className="font-serif italic text-base text-[#F7F2E8]/75">
                        {venue.directions}
                      </p>
                    )}
                    {venue.mapUrl && (
                      <a
                        href={venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-[#B99A62]/60 text-[#E8D39D] hover:bg-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.18em] uppercase transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>View Directions</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="font-display text-base sm:text-lg tracking-[0.12em] text-[#E8D39D]">
                      {venue.statusLabel}
                    </p>
                    <p className="mt-1.5 font-serif italic text-base sm:text-lg text-[#F7F2E8]/75">
                      {venue.statusNote}
                    </p>
                  </div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
