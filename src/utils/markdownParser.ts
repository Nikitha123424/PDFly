export interface ParsedTable {
  headers: string[];
  rows: string[][];
}

export function parseMarkdownTable(text: string): ParsedTable | null {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  
  if (lines.length < 3) return null;
  
  const headerLine = lines[0];
  const separatorLine = lines[1];
  
  // Check if separator looks like a table separator
  if (!separatorLine.match(/^\|?[\s\-|:]+\|?$/)) return null;
  
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
  const rows: string[][] = [];
  
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split('|').map(c => c.trim()).filter(c => c);
    if (cells.length === headers.length) {
      rows.push(cells);
    }
  }
  
  return { headers, rows };
}

export function isMarkdownTable(text: string): boolean {
  return parseMarkdownTable(text) !== null;
}

export function extractCodeBlocks(text: string): { language: string; code: string }[] {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { language: string; code: string }[] = [];
  let match;
  
  while ((match = codeBlockRegex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
    });
  }
  
  return blocks;
}

export function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/___(.*?)___/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^#+\s+/gm, '');
}

export function applyMarkdownFormatting(text: string, format: 'bold' | 'italic' | 'underline' | 'strikethrough'): string {
  switch (format) {
    case 'bold':
      return `**${text}**`;
    case 'italic':
      return `*${text}*`;
    case 'underline':
      return `__${text}__`;
    case 'strikethrough':
      return `~~${text}~~`;
    default:
      return text;
  }
}
