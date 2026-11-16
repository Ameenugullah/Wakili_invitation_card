import React, { useState } from 'react';
import { weddingConfig } from '../config/wedding';
import { OrnamentalDivider } from './Ornaments';

export function CoupleSection() {
  const { couple } = weddingConfig;
  const [imgSrc, setImgSrc] = useState<string>(couple.photoPath);
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  const handleImageError = () => {
    if (imgSrc !== couple.photoFallbackPath) {
      setImgSrc(couple.photoFallbackPath);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <section
      id="couple"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#491E2C] stationery-grain border-t border-[#B99A62]/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="reveal-section text-center mb-14 sm:mb-16">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            The Groom &amp; The Bride
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl md:text-6xl text-[#F7F2E8]">
            Muhammad &amp; Nabeela
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        {/* 2-Column Editorial Presentation */}
        <div className="reveal-section grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait Column — Single Authoritative Couple Photograph */}
          <div className="lg:col-span-6 flex justify-center">
            <figure className="relative w-full max-w-md">
              {/* Outer offset gold architectural frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 border border-[#B99A62]/35 rounded-t-[200px]"
              />

              {/* Inner matted portrait arch */}
              <div className="relative overflow-hidden rounded-t-[190px] border border-[#E8D39D]/55 bg-[#32121D] p-2.5 shadow-[0_24px_64px_rgba(18,5,10,0.6)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[180px] bg-[#32121D]">
                  {!imgFailed ? (
                    <img
                      src={imgSrc}
                      alt={`${couple.groomName} (${couple.groomTitle}) and ${couple.brideName}`}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover object-[50%_26%]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#612D3C]/50 to-[#32121D]">
                      <span className="font-display text-xl tracking-[0.2em] text-[#E8D39D]">
                        {couple.monogram}
                      </span>
                      <span className="mt-2 font-serif italic text-base text-[#F7F2E8]/80">
                        {couple.groomName} ({couple.groomTitle}) &amp;{' '}
                        {couple.brideName}
                      </span>
                    </div>
                  )}

                  {/* Subtle warm edge vignette (keeps couple faces completely natural) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_48px_rgba(50,18,29,0.5)]"
                  />
                </div>
              </div>

              <figcaption className="mt-5 text-center font-serif italic text-base text-[#E8D39D]/90">
                {couple.groomName} ({couple.groomTitle}) &amp; {couple.brideName}
              </figcaption>
            </figure>
          </div>

          {/* Typographic Introduction Column */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="border-t border-b border-[#B99A62]/30 py-10 sm:py-12 px-2 sm:px-6">
              {/* Groom */}
              <div>
                <p className="font-display text-xs tracking-[0.26em] uppercase text-[#E8D39D]/80">
                  The Groom
                </p>
                <h3 className="mt-2 font-script text-5xl sm:text-6xl text-[#F7F2E8] leading-none">
                  {couple.groomName}
                </h3>
                <p className="mt-2 font-display text-sm tracking-[0.34em] uppercase text-[#E8D39D]">
                  {couple.groomTitle}
                </p>
              </div>

              {/* Divider Ampersand */}
              <div className="my-7 flex items-center justify-center lg:justify-start gap-4">
                <span className="h-px w-12 bg-[#B99A62]/50" aria-hidden="true" />
                <span className="font-serif italic text-2xl text-[#E8D39D]">
                  &amp;
                </span>
                <span className="h-px w-12 bg-[#B99A62]/50" aria-hidden="true" />
              </div>

              {/* Bride */}
              <div>
                <p className="font-display text-xs tracking-[0.26em] uppercase text-[#E8D39D]/80">
                  The Bride
                </p>
                <h3 className="mt-2 font-script text-5xl sm:text-6xl text-[#F7F2E8] leading-none">
                  {couple.brideName}
                </h3>
              </div>

              {/* Serene Celebration Note (non-biographical) */}
              <p className="mt-8 font-serif italic text-lg sm:text-xl leading-relaxed text-[#F7F2E8]/85 max-w-md mx-auto lg:mx-0">
                Two hearts united in faith, grace, and enduring affection,
                honoured to celebrate the beginning of their life together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
