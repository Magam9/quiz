export function generateRandomId(prefix: string): string {
  return `${prefix}_${(Math.random() + 1).toString(36).substring(2)}`;
}
