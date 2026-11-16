import React from 'react';

export function CrestOrnament({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="#B99A62"
        strokeWidth="0.9"
        strokeOpacity="0.65"
      />
      <circle
        cx="60"
        cy="60"
        r="45"
        stroke="#E8D39D"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        strokeOpacity="0.55"
      />
      <path
        d="M60 4L63.5 11.5L60 19L56.5 11.5L60 4Z"
        stroke="#E8D39D"
        strokeWidth="0.85"
        fill="#491E2C"
      />
      <path
        d="M60 101L63.5 108.5L60 116L56.5 108.5L60 101Z"
        stroke="#E8D39D"
        strokeWidth="0.85"
        fill="#491E2C"
      />
      <path
        d="M4 60L11.5 56.5L19 60L11.5 63.5L4 60Z"
        stroke="#E8D39D"
        strokeWidth="0.85"
        fill="#491E2C"
      />
      <path
        d="M101 60L108.5 56.5L116 60L108.5 63.5L101 60Z"
        stroke="#E8D39D"
        strokeWidth="0.85"
        fill="#491E2C"
      />
    </svg>
  );
}

export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#B99A62]/70" />
      <svg viewBox="0 0 36 16" fill="none" className="w-8 h-4 shrink-0">
        <path
          d="M18 2L22 8L18 14L14 8L18 2Z"
          stroke="#E8D39D"
          strokeWidth="1"
        />
        <path
          d="M2 8H11M25 8H34"
          stroke="#B99A62"
          strokeWidth="0.85"
          strokeOpacity="0.8"
        />
        <circle cx="18" cy="8" r="1.5" fill="#E8D39D" />
      </svg>
      <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#B99A62]/70" />
    </div>
  );
}

export function CornerFiligree({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const rotationMap = {
    'top-left': 'top-3 left-3 rotate-0',
    'top-right': 'top-3 right-3 rotate-90',
    'bottom-right': 'bottom-3 right-3 rotate-180',
    'bottom-left': 'bottom-3 left-3 -rotate-90',
  };

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute w-8 h-8 sm:w-10 sm:h-10 text-[#B99A62]/75 ${rotationMap[position]}`}
    >
      <path
        d="M2 24V6C2 3.79086 3.79086 2 6 2H24"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M8 16V10C8 8.89543 8.89543 8 10 8H16"
        stroke="#E8D39D"
        strokeOpacity="0.55"
        strokeWidth="0.75"
      />
      <circle cx="6" cy="6" r="1.4" fill="#E8D39D" fillOpacity="0.75" />
    </svg>
  );
}
