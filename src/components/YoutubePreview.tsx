'use client';

import { cn } from '@/lib/utils';
import { getYoutubeId } from '@/utils/getYoutubeId';

export type YoutubePreviewProps = {
  url?: string;
  className?: string;
};

export function YoutubePreview({ url, className }: YoutubePreviewProps) {
  return (
    <iframe
      className={cn('w-full h-[513px]', className)}
      src={`https://www.youtube.com/embed/${getYoutubeId(url)}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
