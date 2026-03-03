export function fixFileNameCoding(name: string): string {
  return Buffer.from(name, 'latin1').toString('utf8');
}
