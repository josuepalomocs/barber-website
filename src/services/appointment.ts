import { isSameOrAfter } from "@/utilities/date";

export type WeekdayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type ShopDayOpenCloseHours = [string, string] | null;
export type ShopDayBreaks = string[][] | null;
export type ShopDayAvailableAppointmentDates = Date[];

export function init(
  weekdayNumber: WeekdayNumber
): ShopDayAvailableAppointmentDates {
  const openCloseHours = getOpenCloseHours(weekdayNumber);
  const breaks = getBreaks(weekdayNumber);
  return getAvailableAppointmentTimes(openCloseHours, breaks, 15);
}

function getOpenCloseHours(
  weekdayNumber: WeekdayNumber
): ShopDayOpenCloseHours {
  const SHOP_SUN_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = null;
  const SHOP_MON_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = ["11:00", "18:30"];
  const SHOP_TUE_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = ["10:00", "17:30"];
  const SHOP_WED_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = null;
  const SHOP_THU_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = ["09:00", "18:00"];
  const SHOP_FRI_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = ["09:00", "19:30"];
  const SHOP_SAT_OPEN_CLOSE_HOURS: ShopDayOpenCloseHours = ["09:00", "19:30"];

  switch (weekdayNumber) {
    case 0:
      return SHOP_SUN_OPEN_CLOSE_HOURS;
    case 1:
      return SHOP_MON_OPEN_CLOSE_HOURS;
    case 2:
      return SHOP_TUE_OPEN_CLOSE_HOURS;
    case 3:
      return SHOP_WED_OPEN_CLOSE_HOURS;
    case 4:
      return SHOP_THU_OPEN_CLOSE_HOURS;
    case 5:
      return SHOP_FRI_OPEN_CLOSE_HOURS;
    case 6:
      return SHOP_SAT_OPEN_CLOSE_HOURS;
  }
}

function getBreaks(weekdayNumber: WeekdayNumber) {
  const SHOP_SUN_BREAKS: ShopDayBreaks = null;
  const SHOP_MON_BREAKS: ShopDayBreaks = [["14:00", "14:30"]];
  const SHOP_TUE_BREAKS: ShopDayBreaks = [["14:00", "14:30"]];
  const SHOP_WED_BREAKS: ShopDayBreaks = null;
  const SHOP_THU_BREAKS: ShopDayBreaks = [["14:00", "14:35"]];
  const SHOP_FRI_BREAKS: ShopDayBreaks = [["14:00", "14:30"]];
  const SHOP_SAT_BREAKS: ShopDayBreaks = [["14:00", "14:30"]];

  switch (weekdayNumber) {
    case 0:
      return SHOP_SUN_BREAKS;
    case 1:
      return SHOP_MON_BREAKS;
    case 2:
      return SHOP_TUE_BREAKS;
    case 3:
      return SHOP_WED_BREAKS;
    case 4:
      return SHOP_THU_BREAKS;
    case 5:
      return SHOP_FRI_BREAKS;
    case 6:
      return SHOP_SAT_BREAKS;
  }
}

function getAvailableAppointmentTimes(
  openCloseHours: ShopDayOpenCloseHours,
  breaks: ShopDayBreaks,
  appointmentIntervalInMinutes: number
): ShopDayAvailableAppointmentDates {
  if (!openCloseHours) {
    return [];
  }
  let availableAppointmentDates: ShopDayAvailableAppointmentDates = [];
  const openDate = convertHourStringToDate(openCloseHours[0]);
  const closeDate = convertHourStringToDate(openCloseHours[1]);
  const numBreaks = breaks ? breaks.length : 0;
  let nextAppointmentStart = openDate;
  let nextBreakIndex = 0;
  let nextBreakStart = breaks
    ? convertHourStringToDate(breaks[nextBreakIndex][0])
    : null;
  let nextBreakEnd = breaks
    ? convertHourStringToDate(breaks[nextBreakIndex][1])
    : null;

  // loop while the next appointment start date does not overlap with the shop close date
  while (!isSameOrAfter(nextAppointmentStart, closeDate)) {
    if (nextBreakStart && nextBreakEnd) {
      while (!isSameOrAfter(nextAppointmentStart, nextBreakStart)) {
        console.log("here");
        availableAppointmentDates.push(nextAppointmentStart);
        const prevAppointmentStart = nextAppointmentStart;
        nextAppointmentStart = new Date();
        nextAppointmentStart.setHours(
          prevAppointmentStart.getHours(),
          prevAppointmentStart.getMinutes() + appointmentIntervalInMinutes,
          0
        );
      }
      // at this point, the next appointment start date overlaps with the next break start date
      // we set the next appointment start date to the next break end date
      nextAppointmentStart = nextBreakEnd;
      if (nextBreakIndex < numBreaks - 1) {
        nextBreakIndex++;
        nextBreakStart = convertHourStringToDate(breaks![nextBreakIndex][0]);
        continue;
      }
      nextBreakStart = null;
      nextBreakEnd = null;
    }
    availableAppointmentDates.push(nextAppointmentStart);
    const prevAppointmentStart = nextAppointmentStart;
    nextAppointmentStart = new Date();
    nextAppointmentStart.setHours(
      prevAppointmentStart.getHours(),
      prevAppointmentStart.getMinutes() + appointmentIntervalInMinutes,
      0
    );
  }

  return availableAppointmentDates;
}

function convertHourStringToDate(dateString: string): Date {
  const dateStringArray = dateString.split(":");
  const hours = Number(dateStringArray[0]);
  const minutes = Number(dateStringArray[1]);
  const date = new Date();
  date.setHours(hours, minutes, 0);
  return date;
}
