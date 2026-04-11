export function formatBadgeCount(count: number): string {
  if (count >= 1000) return `${Math.floor(count / 1000)}k+`;
  return String(count);
}
