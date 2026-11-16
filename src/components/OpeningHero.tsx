import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { CrestOrnament, OrnamentalDivider, CornerFiligree } from './Ornaments';

interface OpeningHeroProps {
  onExplore: () => void;
}

export function OpeningHero({ onExplore }: OpeningHeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 1.05,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { couple, date } = weddingConfig;

  return (
    <section
      id="opening"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-8 pt-24 pb-14 bg-[#491E2C] stationery-grain overflow-hidden"
    >
      {/* Subtle layered inner burgundy vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(97,45,60,0.34)_0%,rgba(50,18,29,0.72)_100%)]"
      />

      {/* Bespoke stationery outer framing */}
      <div className="relative w-full max-w-4xl mx-auto border border-[#B99A62]/40 bg-[#32121D]/45 backdrop-blur-[2px] px-6 py-14 sm:px-14 sm:py-20 text-center shadow-[0_30px_90px_rgba(18,5,10,0.55)]">
        <CornerFiligree position="top-left" />
        <CornerFiligree position="top-right" />
        <CornerFiligree position="bottom-left" />
        <CornerFiligree position="bottom-right" />

        {/* Subtle inner hairline frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 sm:inset-3.5 border border-[#B99A62]/20"
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Crest & Monogram */}
          <div className="hero-reveal relative flex items-center justify-center mb-6">
            <CrestOrnament className="w-20 h-20 sm:w-24 sm:h-24" />
            <span className="absolute font-display text-sm sm:text-base tracking-[0.18em] text-[#E8D39D]">
              {couple.monogram}
            </span>
          </div>

          {/* Introductory Message */}
          <p className="hero-reveal font-display text-xs sm:text-sm tracking-[0.28em] uppercase text-[#E8D39D]">
            Wedding Invitation
          </p>

          <p className="hero-reveal mt-3 font-serif italic text-lg sm:text-xl text-[#F7F2E8]/85 max-w-md">
            With gratitude and joy, you are warmly invited to celebrate the union of
          </p>

          {/* Couple Names */}
          <div className="hero-reveal mt-8 mb-6 flex flex-col items-center">
            <h1 className="flex flex-col items-center">
              <span className="font-script text-5xl sm:text-7xl md:text-8xl leading-[1.08] text-[#F7F2E8] drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
                {couple.groomName}
              </span>
              <span className="mt-1 font-display text-xs sm:text-sm tracking-[0.38em] uppercase text-[#E8D39D]">
                ({couple.groomTitle})
              </span>

              <span
                aria-hidden="true"
                className="my-3 font-serif italic text-2xl sm:text-3xl text-[#B99A62]"
              >
                &amp;
              </span>

              <span className="font-script text-5xl sm:text-7xl md:text-8xl leading-[1.08] text-[#F7F2E8] drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
                {couple.brideName}
              </span>
            </h1>
          </div>

          <OrnamentalDivider className="hero-reveal my-4" />

          {/* Confirmed Wedding Date */}
          <p className="hero-reveal font-display text-sm sm:text-base md:text-lg tracking-[0.26em] uppercase text-[#E8D39D]">
            {date.displayUpper}
          </p>
          <p className="hero-reveal mt-2 font-serif text-sm sm:text-base tracking-wide text-[#F7F2E8]/75">
            Venue: {weddingConfig.venue.statusLabel}
          </p>

          {/* Primary Invitation CTA */}
          <div className="hero-reveal mt-10">
            <button
              type="button"
              onClick={onExplore}
              className="group inline-flex items-center gap-3 min-h-[44px] px-7 py-3 border border-[#E8D39D]/75 bg-[#491E2C]/70 hover:bg-[#E8D39D] text-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer"
            >
              <span>Open Invitation</span>
              <ChevronDown
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
