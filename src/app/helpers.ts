export function generateRandomId(prefix: string): string {
  return `${prefix}_${(Math.random() + 1).toString(36).substring(2)}`;
}

export function getRandomColor(): string {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
