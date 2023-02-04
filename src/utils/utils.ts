// todo remove this and use parseInt
export function extractNumber(from: string): number {
  return Number(from.split('px')[0]);
}

export function numberToPixel(value: number): string {
  return `${value}px`;
}
