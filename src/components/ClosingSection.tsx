import React from 'react';
import { ArrowUp } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { CrestOrnament, OrnamentalDivider } from './Ornaments';

interface ClosingSectionProps {
  onBackToTop: () => void;
}

export function ClosingSection({ onBackToTop }: ClosingSectionProps) {
  const { couple, date } = weddingConfig;

  return (
    <footer className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#32121D] border-t border-[#B99A62]/30 text-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(97,45,60,0.35)_0%,transparent_68%)]"
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-7">
          <CrestOrnament className="w-20 h-20" />
          <span className="absolute font-display text-sm tracking-[0.18em] text-[#E8D39D]">
            {couple.monogram}
          </span>
        </div>

        <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-[#F7F2E8]/90 max-w-lg">
          We look forward with heartfelt joy to celebrating this blessed
          occasion with our cherished family and friends.
        </p>

        <OrnamentalDivider className="my-8" />

        <h2 className="font-script text-4xl sm:text-6xl text-[#F7F2E8]">
          {couple.groomName}{' '}
          <span className="font-display text-sm sm:text-base tracking-[0.26em] text-[#E8D39D] align-middle mx-1">
            ({couple.groomTitle})
          </span>{' '}
          &amp; {couple.brideName}
        </h2>

        <p className="mt-4 font-display text-sm sm:text-base tracking-[0.26em] uppercase text-[#E8D39D]">
          {date.displayShort}
        </p>

        <div className="mt-12">
          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-[#B99A62]/45 text-[#E8D39D]/85 hover:text-[#32121D] hover:bg-[#E8D39D] font-display text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
