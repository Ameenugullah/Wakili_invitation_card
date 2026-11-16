import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { weddingConfig } from './config/wedding';
import { Navbar, NavItem } from './components/Navbar';
import { OpeningHero } from './components/OpeningHero';
import { InvitationSection } from './components/InvitationSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { DetailsSection } from './components/DetailsSection';
import {
  ProgrammeSection,
  RsvpSection,
  GuestInfoSection,
  ContactSection,
} from './components/OptionalSections';
import { ClosingSection } from './components/ClosingSection';
import { MusicPlayer } from './components/MusicPlayer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState<string>('opening');

  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [
      { id: 'opening', label: 'Opening' },
      { id: 'invitation', label: 'Invitation' },
      { id: 'couple', label: 'The Couple' },
      { id: 'date', label: 'Date' },
      { id: 'details', label: 'Details' },
    ];

    if (weddingConfig.programme.length > 0) {
      items.push({ id: 'programme', label: 'Programme' });
    }
    if (
      weddingConfig.rsvp.enabled &&
      (weddingConfig.rsvp.endpoint || weddingConfig.rsvp.externalUrl)
    ) {
      items.push({ id: 'rsvp', label: 'RSVP' });
    }
    if (weddingConfig.guestInfo.length > 0) {
      items.push({ id: 'guest-info', label: 'Guests' });
    }
    if (weddingConfig.contacts.length > 0) {
      items.push({ id: 'contact', label: 'Contact' });
    }

    return items;
  }, []);

  // Initialize Lenis smooth scrolling and GSAP ScrollTrigger reveals
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = 0;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const elements = gsap.utils.toArray<HTMLElement>('.reveal-section');
      elements.forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      ctx.revert();
    };
  }, []);

  // Track active section in viewport for navigation underline
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-35% 0px -50% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [navItems]);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: id === 'opening' ? 0 : -48 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#491E2C] text-[#F7F2E8]">
      <Navbar
        items={navItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main>
        <OpeningHero onExplore={() => scrollToSection('invitation')} />
        <InvitationSection />
        <CoupleSection />
        <CountdownSection />
        <DetailsSection />
        <ProgrammeSection />
        <RsvpSection />
        <GuestInfoSection />
        <ContactSection />
      </main>

      <ClosingSection onBackToTop={() => scrollToSection('opening')} />
      <MusicPlayer />
    </div>
  );
}
