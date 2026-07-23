'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { classifyMedia, getYouTubeEmbedUrl, getVimeoEmbedUrl, mediaHost } from '@/lib/media';
import { youtubeThumb } from '@/lib/utils';

interface CaseStudyMediaItemProps {
  url: string;
  name: string;
  /** Pre-fetched via Vimeo's oEmbed API server-side; undefined if unavailable. */
  vimeoThumb?: string;
}

function LinkCard({ url, kicker, heading }: { url: string; kicker: string; heading: string }) {
  return (
    <a className="cs-study-media__link" href={url} target="_blank" rel="noopener noreferrer">
      <span className="cs-study-media__link-copy">
        <small>{kicker}</small>
        <strong>{heading}</strong>
        <em>{mediaHost(url)}</em>
      </span>
      <span className="cs-study-media__link-arrow"><Icon name="arrow-ur" /></span>
    </a>
  );
}

function VideoThumb({ src, alt, label, onPlay, onError }: { src: string; alt: string; label: string; onPlay: () => void; onError: () => void }) {
  return (
    <button type="button" className="cs-study-media__thumb" onClick={onPlay} aria-label={label}>
      <img src={src} alt={alt} loading="lazy" onError={onError} />
      <span className="cs-study-media__play" aria-hidden="true" />
    </button>
  );
}

export default function CaseStudyMediaItem({ url, name, vimeoThumb }: CaseStudyMediaItemProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const media = classifyMedia(url);

  if (media.kind === 'video') return <video src={url} controls preload="metadata" />;
  if (media.kind === 'image') return <img src={url} alt={`${name} project media`} loading="lazy" />;

  if (media.kind === 'youtube') {
    if (playing) {
      return (
        <iframe
          src={getYouTubeEmbedUrl(media.id)}
          title={`${name} video`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (thumbFailed) return <LinkCard url={url} kicker="Video" heading="Watch the video" />;
    return (
      <VideoThumb
        src={youtubeThumb(url)}
        alt={`${name} video thumbnail`}
        label={`Play video: ${name}`}
        onPlay={() => setPlaying(true)}
        onError={() => setThumbFailed(true)}
      />
    );
  }

  if (media.kind === 'vimeo') {
    if (playing) {
      return (
        <iframe
          src={getVimeoEmbedUrl(media.id)}
          title={`${name} video`}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (!vimeoThumb || thumbFailed) return <LinkCard url={url} kicker="Video" heading="Watch the video" />;
    return (
      <VideoThumb
        src={vimeoThumb}
        alt={`${name} video thumbnail`}
        label={`Play video: ${name}`}
        onPlay={() => setPlaying(true)}
        onError={() => setThumbFailed(true)}
      />
    );
  }

  return <LinkCard url={url} kicker="External resource" heading="Open project media" />;
}
