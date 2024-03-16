//expect: 10000 -> 10,000 | 1000000 -> 1,000,000 | 100000 -> 100,000
export function DigitParser(value: number): string {
  if (!value) {
    return '0';
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
