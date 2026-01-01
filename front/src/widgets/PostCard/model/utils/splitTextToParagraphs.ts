export function splitTextToParagraphs(text?: string): string[] {
  if (!text) return [];

  return text.split(/\r?\n/);
}