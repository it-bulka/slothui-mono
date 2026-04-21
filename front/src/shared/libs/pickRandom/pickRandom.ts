export const pickRandom = <T,>(arr: T[], count: number): T[] =>
  [...arr].sort(() => Math.random() - 0.5).slice(0, count);
