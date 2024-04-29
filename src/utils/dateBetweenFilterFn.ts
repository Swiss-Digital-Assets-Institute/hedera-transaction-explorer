import { FilterFn } from "@tanstack/react-table";

// Filters with the special filter fn
export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  // Date format for all values, date, start, end
  const rawDate: string = row.getValue(columnId);
  const dateParts = rawDate.split(", ")[0].split("/");
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[0]) - 1;
  const day = parseInt(dateParts[1]);
  const date = new Date(year, month, day, 0, 0, 0);
  const [start, end] = value.split(" - ");

  const startDateRaw = start.split("/");
  const startYear = parseInt(startDateRaw[2]);
  const startMonth = parseInt(startDateRaw[0]) - 1;
  const startDay = parseInt(startDateRaw[1]);
  const startDate = new Date(startYear, startMonth, startDay, 0, 0, 0);

  const endDateRaw = end.split("/");
  const endYear = parseInt(endDateRaw[2]);
  const endMonth = parseInt(endDateRaw[0]) - 1;
  const endDay = parseInt(endDateRaw[1]);
  const endDate = new Date(endYear, endMonth, endDay, 0, 0, 0);

  // Checks if there is a date selected, and then filters by which date exists
  if ((startDate || endDate) && !date) return false;
  if (startDate && !endDate) {
    return date.getTime() >= startDate.getTime();
  } else if (!startDate && endDate) {
    return date.getTime() <= endDate.getTime();
  } else if (startDate && endDate) {
    return (
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime()
    );
  } else return true;
};

dateBetweenFilterFn.autoRemove;

export default dateBetweenFilterFn;
