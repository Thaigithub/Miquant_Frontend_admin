export default function MoneyParser(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0, // Set the minimum fraction digits to 0
    maximumFractionDigits: 0, // Set the maximum fraction digits to 0
  }).format(value);
}
