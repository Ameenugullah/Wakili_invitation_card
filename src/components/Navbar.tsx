import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { weddingConfig, downloadWeddingCalendarInvite } from '../config/wedding';

export interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Navbar({ items, activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#32121D]/92 backdrop-blur-md border-b border-[#B99A62]/25 shadow-[0_8px_30px_rgba(0,0,0,0.28)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#opening"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('opening');
          }}
          className="font-display text-base sm:text-lg tracking-[0.22em] text-[#E8D39D] hover:text-[#F7F2E8] transition-colors whitespace-nowrap shrink-0"
          aria-label="Muhammad (WAKILI) and Nabeela — Return to top"
        >
          {weddingConfig.couple.monogram}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Invitation sections"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-2 font-display text-xs tracking-[0.18em] uppercase transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#E8D39D]'
                    : 'text-[#F7F2E8]/75 hover:text-[#E8D39D]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0.5 inset-x-0 h-px bg-[#E8D39D] transition-transform duration-200 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action & mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={downloadWeddingCalendarInvite}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 min-h-[40px] border border-[#B99A62]/65 text-[#E8D39D] hover:bg-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.16em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Save Date</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#E8D39D] hover:text-[#F7F2E8] transition-colors cursor-pointer"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#32121D]/98 backdrop-blur-lg border-t border-b border-[#B99A62]/25 px-6 py-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-center justify-between min-h-[44px] px-2 font-display text-xs tracking-[0.2em] uppercase border-b border-[#B99A62]/15 transition-colors ${
                    isActive
                      ? 'text-[#E8D39D]'
                      : 'text-[#F7F2E8]/80 hover:text-[#E8D39D]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="font-serif italic text-xs tracking-normal text-[#B99A62]">
                      Viewing
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          <div className="pt-5">
            <button
              type="button"
              onClick={() => {
                downloadWeddingCalendarInvite();
                setMobileOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 border border-[#B99A62]/70 text-[#E8D39D] hover:bg-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Save the Date</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
