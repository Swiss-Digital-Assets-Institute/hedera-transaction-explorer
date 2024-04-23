// Converts tinybar to Hbar
export function tinybarToHbarConvert(tinybar: number | undefined) {
  if (tinybar === undefined) return 0;
  return tinybar / 100000000;
}
