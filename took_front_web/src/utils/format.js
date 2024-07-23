export function formatNumber(number) {
  if (number == null) return '0'; 
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
