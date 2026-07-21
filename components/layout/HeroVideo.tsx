'use client';

import { useEffect, useRef } from 'react';

type HeroVideoProps = {
  className?: string;
  src?: string;
  poster?: string;
};

export default function HeroVideo({
  className = 'cs-home-hero__video',
  src = '/videos/founder-intro.mp4',
  poster = '/videos/founder-intro-poster.jpg',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Some iOS browsers need the muted properties set directly before play().
    video.defaultMuted = true;
    video.muted = true;

    const play = () => {
      void video.play().catch(() => {
        // Low Power Mode can still block autoplay; the poster remains visible
        // and the first user interaction below retries playback.
      });
    };

    play();
    document.addEventListener('touchstart', play, { once: true, passive: true });
    document.addEventListener('pointerdown', play, { once: true, passive: true });
    document.addEventListener('visibilitychange', play);

    return () => {
      document.removeEventListener('touchstart', play);
      document.removeEventListener('pointerdown', play);
      document.removeEventListener('visibilitychange', play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
