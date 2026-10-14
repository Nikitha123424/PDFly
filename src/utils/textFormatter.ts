export interface TextStats {
  characters: number;
  words: number;
  paragraphs: number;
  lines: number;
}

export function getTextStats(text: string): TextStats {
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
  const lines = text ? text.split('\n').length : 0;
  
  return { characters, words, paragraphs, lines };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .replace(/^-|-$/g, '');
}

export const DEFAULT_FONTS = [
  'Helvetica',
  'Times',
  'Courier',
  'Arial',
  'Verdana',
  'Georgia',
  'Comic Sans MS',
  'Trebuchet MS',
];

export const LINE_SPACING_OPTIONS = [
  { value: 1, label: '1.0 (Single)' },
  { value: 1.15, label: '1.15' },
  { value: 1.5, label: '1.5 (1.5 lines)' },
  { value: 2, label: '2.0 (Double)' },
];

export const FONT_SIZES = Array.from({ length: 16 }, (_, i) => i + 8); // 8-23
