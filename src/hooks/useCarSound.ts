"use client";

import { useEffect, useRef, useState } from "react";

export function useCarSound(scrollProgress: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/car-rev.mp3");
    audio.loop = true;
    audio.volume = 0;

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    audio.addEventListener('error', () => {
      console.log('Audio file not found or cannot be loaded');
      setAudioLoaded(false);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !hasInteracted || !audioLoaded) return;

    const audio = audioRef.current;

    // Calculate volume based on scroll progress
    // Fade in as you scroll, fade out near the end
    let targetVolume = 0;

    if (scrollProgress > 0.1 && scrollProgress < 0.8) {
      // Normal scrolling range
      targetVolume = 0.3; // Max volume
    } else if (scrollProgress >= 0.8) {
      // Fade out near the end
      targetVolume = Math.max(0, 0.3 * (1 - (scrollProgress - 0.8) / 0.2));
    }

    // Apply mute state
    if (isMuted) {
      targetVolume = 0;
    }

    // Smooth volume transition
    const fadeInterval = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeInterval);
        return;
      }

      const currentVol = audioRef.current.volume;
      const diff = targetVolume - currentVol;

      if (Math.abs(diff) < 0.01) {
        audioRef.current.volume = targetVolume;
        setVolume(targetVolume);
        clearInterval(fadeInterval);
      } else {
        audioRef.current.volume += diff * 0.1;
        setVolume(audioRef.current.volume);
      }
    }, 50);

    return () => clearInterval(fadeInterval);
  }, [scrollProgress, isMuted, hasInteracted, audioLoaded]);

  const toggleMute = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    setIsMuted(!isMuted);

    if (!isMuted && audioRef.current && audioLoaded) {
      // Unmuting - play audio
      audioRef.current.play().catch(console.error);
    } else if (audioRef.current) {
      // Muting - pause audio
      audioRef.current.pause();
    }
  };

  const enableSound = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsMuted(false);

    if (audioRef.current && audioLoaded) {
      audioRef.current.play().catch(console.error);
    }
  };

  return {
    isMuted,
    hasInteracted,
    volume,
    audioLoaded,
    toggleMute,
    enableSound,
  };
}
