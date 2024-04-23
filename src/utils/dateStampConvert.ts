// Converts timestamp to a string Date
export function timestampToDate(timestamp: string): string {
  const date = new Date(parseFloat(timestamp) * 1000);
  return date.toLocaleString();
}
