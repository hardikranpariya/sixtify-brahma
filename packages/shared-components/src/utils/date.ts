import { DateTime } from "luxon";

export const dateFormat = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat("dd-MM-yyyy");
};

export const getTimeInHHmm = (date: string, format: string = "HH:mm") => {
  const dateTime = DateTime.fromISO(date).toFormat(format);

  return dateTime;
};
