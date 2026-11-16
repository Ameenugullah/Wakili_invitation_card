import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export function MusicPlayer() {
  const { audio } = weddingConfig;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    el.addEventListener('ended', onEnded);
    el.addEventListener('pause', onPause);
    el.addEventListener('play', onPlay);

    return () => {
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('play', onPlay);
    };
  }, []);

  if (!audio.src) {
    return null;
  }

  const toggleAudio = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
    } else {
      try {
        await el.play();
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src={audio.src} loop preload="none" />
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        aria-pressed={isPlaying}
        className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-[#32121D]/90 backdrop-blur-md border border-[#B99A62]/60 text-[#E8D39D] hover:bg-[#E8D39D] hover:text-[#32121D] font-display text-xs tracking-[0.18em] uppercase shadow-[0_10px_28px_rgba(0,0,0,0.4)] transition-colors cursor-pointer"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
        ) : (
          <VolumeX className="w-4 h-4 shrink-0" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </span>
      </button>
    </div>
  );
}
