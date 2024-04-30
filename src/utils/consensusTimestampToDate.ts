// Converts conesnsusTimestamp To date format
export function consensusTimestampToDate(consensusTimestamp: string) {
  const dateParts = consensusTimestamp.split(", ")[0].split("/");
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[0]) - 1;
  const day = parseInt(dateParts[1]);
  return new Date(year, month, day, 0, 0, 0);
}
