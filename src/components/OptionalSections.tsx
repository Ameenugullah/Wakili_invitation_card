import React, { useState } from 'react';
import { Phone, Mail, ExternalLink } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { OrnamentalDivider } from './Ornaments';

export function ProgrammeSection() {
  const { programme } = weddingConfig;
  if (!programme || programme.length === 0) return null;

  return (
    <section
      id="programme"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#32121D] border-t border-[#B99A62]/20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="reveal-section text-center mb-12">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            Order of Celebration
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl text-[#F7F2E8]">
            Wedding Programme
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        <div className="reveal-section border border-[#B99A62]/35 bg-[#491E2C]/45 divide-y divide-[#B99A62]/20 px-6 sm:px-10">
          {programme.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
            >
              <p className="sm:col-span-4 font-display text-xs tracking-[0.2em] uppercase text-[#E8D39D]">
                {item.time}
              </p>
              <div className="sm:col-span-8">
                <h3 className="font-serif text-xl sm:text-2xl text-[#F7F2E8]">
                  {item.title}
                </h3>
                {item.location && (
                  <p className="mt-1 font-display text-xs tracking-[0.15em] uppercase text-[#B99A62]">
                    {item.location}
                  </p>
                )}
                {item.description && (
                  <p className="mt-2 font-serif text-base sm:text-lg text-[#F7F2E8]/80">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RsvpSection() {
  const { rsvp } = weddingConfig;
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!rsvp.enabled || (!rsvp.endpoint && !rsvp.externalUrl)) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp.endpoint || !guestName.trim()) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const response = await fetch(rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName: guestName.trim(), attending }),
      });
      if (!response.ok) throw new Error('Unable to record response');
      setSubmitted(true);
    } catch {
      setErrorMsg('We could not send your response right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#491E2C] stationery-grain border-t border-[#B99A62]/20"
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="reveal-section">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            Kindly Respond
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl text-[#F7F2E8]">
            R.S.V.P.
          </h2>
          <OrnamentalDivider className="my-5" />

          {rsvp.deadline && (
            <p className="mb-8 font-serif italic text-lg text-[#F7F2E8]/80">
              Please respond by {rsvp.deadline}
            </p>
          )}

          {rsvp.externalUrl ? (
            <a
              href={rsvp.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 min-h-[44px] px-8 py-3 border border-[#E8D39D]/75 text-[#E8D39D] hover:bg-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.22em] uppercase transition-colors"
            >
              <span>Confirm Attendance</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : submitted ? (
            <div className="border border-[#B99A62]/40 bg-[#32121D]/70 p-8">
              <p className="font-serif text-xl text-[#E8D39D]">
                Thank you, {guestName}. Your response has been recorded.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border border-[#B99A62]/35 bg-[#32121D]/65 p-6 sm:p-10 text-left space-y-6"
            >
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block font-display text-xs tracking-[0.2em] uppercase text-[#E8D39D] mb-2"
                >
                  Full Name
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full min-h-[44px] bg-[#491E2C]/60 border border-[#B99A62]/40 px-4 py-2.5 font-serif text-lg text-[#F7F2E8] focus:border-[#E8D39D] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 font-serif text-lg text-[#F7F2E8] cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === 'yes'}
                    onChange={() => setAttending('yes')}
                    className="accent-[#E8D39D]"
                  />
                  <span>Joyfully Accepts</span>
                </label>
                <label className="inline-flex items-center gap-2 font-serif text-lg text-[#F7F2E8] cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === 'no'}
                    onChange={() => setAttending('no')}
                    className="accent-[#E8D39D]"
                  />
                  <span>Regretfully Declines</span>
                </label>
              </div>

              {errorMsg && (
                <p className="font-serif text-base text-[#E8D39D]">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[44px] border border-[#E8D39D]/75 bg-[#491E2C] hover:bg-[#E8D39D] text-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.22em] uppercase transition-colors cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Send Response'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function GuestInfoSection() {
  const { guestInfo } = weddingConfig;
  if (!guestInfo || guestInfo.length === 0) return null;

  return (
    <section
      id="guest-info"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#32121D] border-t border-[#B99A62]/20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="reveal-section text-center mb-12">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            For Our Guests
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl text-[#F7F2E8]">
            Guest Information
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6">
          {guestInfo.map((info, idx) => (
            <div
              key={`${info.title}-${idx}`}
              className="border border-[#B99A62]/30 bg-[#491E2C]/45 p-7"
            >
              <h3 className="font-display text-xs tracking-[0.22em] uppercase text-[#E8D39D]">
                {info.title}
              </h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-[#F7F2E8]/85">
                {info.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { contacts } = weddingConfig;
  if (!contacts || contacts.length === 0) return null;

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#491E2C] stationery-grain border-t border-[#B99A62]/20"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="reveal-section mb-12">
          <p className="font-display text-xs tracking-[0.28em] uppercase text-[#E8D39D]">
            Enquiries
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl text-[#F7F2E8]">
            Contact Information
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        <div className="reveal-section grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((person, idx) => (
            <div
              key={`${person.name}-${idx}`}
              className="border border-[#B99A62]/35 bg-[#32121D]/60 p-7"
            >
              <h3 className="font-serif text-2xl text-[#F7F2E8]">{person.name}</h3>
              {person.role && (
                <p className="mt-1 font-display text-xs tracking-[0.2em] uppercase text-[#E8D39D]">
                  {person.role}
                </p>
              )}
              <div className="mt-4 space-y-2">
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="inline-flex items-center gap-2 font-serif text-lg text-[#F7F2E8]/85 hover:text-[#E8D39D] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#E8D39D]" aria-hidden="true" />
                    <span>{person.phone}</span>
                  </a>
                )}
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center gap-2 font-serif text-lg text-[#F7F2E8]/85 hover:text-[#E8D39D] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#E8D39D]" aria-hidden="true" />
                    <span>{person.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
