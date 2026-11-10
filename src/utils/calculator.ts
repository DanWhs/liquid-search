/**
 * Pure helper functions for Liquid Search applet geometry, clip calculations,
 * and search URL generation.
 */

export interface Dimensions {
  width: number;
  height: number;
}

export interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function calculateTitleScale(
  natural: Dimensions,
  viewport: Dimensions,
  targetHeightRatio = 0.505
): { scaleX: number; scaleY: number } {
  if (natural.width <= 0 || natural.height <= 0 || viewport.width <= 0 || viewport.height <= 0) {
    return { scaleX: 1, scaleY: 1 };
  }
  const scaleX = viewport.width / natural.width;
  const scaleY = (viewport.height * targetHeightRatio) / natural.height;
  return { scaleX, scaleY };
}

export function calculateCardClipInset(
  cardRect: Rect,
  viewport: Dimensions,
  borderRadius = '16px'
): string {
  const topInset = Math.max(0, Math.round(cardRect.top));
  const rightInset = Math.max(0, Math.round(viewport.width - cardRect.right));
  const bottomInset = Math.max(0, Math.round(viewport.height - cardRect.bottom));
  const leftInset = Math.max(0, Math.round(cardRect.left));

  return `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round ${borderRadius})`;
}

export function buildSearchUrl(query: string, searchEngine = 'https://www.google.com/search'): string {
  const clean = query.trim();
  if (!clean) return '';
  return `${searchEngine}?q=${encodeURIComponent(clean)}`;
}

export interface AppService {
  name: string;
  url: string;
}

export const APP_SERVICES: AppService[] = [
  { name: 'Spotify', url: 'https://open.spotify.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'TikTok', url: 'https://www.tiktok.com' },
  { name: 'Apple', url: 'https://www.apple.com' },
];
