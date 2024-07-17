export const getYoutubeId = (url?: string): string | null => {
  if (!url) return null;

  const regex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  return regex.exec(url)?.[3] ?? null;
};
