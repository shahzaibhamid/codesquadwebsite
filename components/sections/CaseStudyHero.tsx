'use client';

import { useState, type ReactNode, type SyntheticEvent } from 'react';

export default function CaseStudyHero({ cover, alt, children }: { cover?: string; alt: string; children: ReactNode }) {
  const [tone, setTone] = useState<'light' | 'dark'>('dark');

  function measure(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0, 32, 32);
      const pixels = context.getImageData(0, 0, 32, 32).data;
      let brightness = 0;
      let samples = 0;
      for (let index = 0; index < pixels.length; index += 16) {
        const alpha = pixels[index + 3] / 255;
        const red = pixels[index] * alpha + 255 * (1 - alpha);
        const green = pixels[index + 1] * alpha + 255 * (1 - alpha);
        const blue = pixels[index + 2] * alpha + 255 * (1 - alpha);
        brightness += red * .299 + green * .587 + blue * .114;
        samples++;
      }
      setTone(brightness / samples > 155 ? 'light' : 'dark');
    } catch {
      // Cross-origin images may block pixel access. The dark fallback includes
      // a contrast overlay so text remains readable in that case.
      setTone('dark');
    }
  }

  function recoverRemoteImage(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    if (image.crossOrigin) {
      image.removeAttribute('crossorigin');
      image.src = cover || '';
    }
  }

  return (
    <header className={`cs-study-hero${cover ? ` cs-study-hero--cover cs-study-hero--${tone}` : ''}`}>
      {cover && <img className="cs-study-hero__image" src={cover} alt={alt} crossOrigin={cover.startsWith('http') ? 'anonymous' : undefined} onLoad={measure} onError={recoverRemoteImage} />}
      {cover && <span className="cs-study-hero__contrast" aria-hidden="true" />}
      {children}
    </header>
  );
}
