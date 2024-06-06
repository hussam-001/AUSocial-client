import moment from "moment-timezone";
import i18n from "@/config/i18n";
import { isoStringFormat } from "@/constants/date";

export const generateTimeSlots = (slot: number, start: string, end: string) => {
  //TODO Edit the function name
  var startTime = new Date(`2020-01-01T${start}`);
  const endTime = new Date(`2020-01-01T${end}`);
  const timeSlots = [];
  while (startTime < endTime) {
    timeSlots.push({
      // TODO: use moment.js
      label: startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      value: startTime.toISOString().split("T")[1].split(".")[0],
    });
    startTime = moment(startTime).add(slot, "minutes").toDate();
  }
  return timeSlots;
};

export const humanizeDuration = (duration: number) => {
  const { t } = i18n;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const label: any = `${hours > 0 ? hours + ` ${t("COMMON.HOUR")} ` : ""}${
    minutes > 0 ? minutes + ` ${t("COMMON.MINUTE")}` : ""
  }`;
  return label;
};

const datetimePattern: RegExp =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3}Z)?|^\d{2}:\d{2}(:\d{2})?$/;

export const convertTimezoneToUTC: any = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return as is if the value is not an object
  }

  if (obj instanceof FormData) {
    const data = obj.get("data") as string;
    if (!data) return obj;
    const convertedValue = convertTimezoneToUTC(JSON.parse(data));
    obj.set("data", JSON.stringify(convertedValue));
    return obj;
  }

  if (Array.isArray(obj)) {
    // If the value is an array, recursively convert each element
    return obj.map((item) => convertTimezoneToUTC(item));
  }

  // Convert time values from the specified timezone to UTC
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];
      if (typeof value === "string" && datetimePattern.test(value)) {
        const isDateTime = value.includes("T");
        if (value.includes("+")) value = value.split("+")[0];
        const timezoneMoment = moment(
          isDateTime ? value : moment().format(`YYYY-MM-DD[T${value}]`)
        );
        if (timezoneMoment.isValid()) {
          const convertedDate = timezoneMoment
            .utc()
            .format(isDateTime ? `${isoStringFormat}[.000Z]` : "HH:mm:ss");
          obj[key] = convertedDate;
        }
      } else if (typeof value === "object" && value !== null) {
        obj[key] = convertTimezoneToUTC(value); // Recursively convert nested objects
      }
    }
  }

  return obj;
};

export const convertUTCtoTimezone: any = (obj: any) => {
  const timeZone = localStorage.getItem("timeZone") ?? "Asia/Riyadh";
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return as is if the value is not an object
  }

  if (Array.isArray(obj)) {
    // If the value is an array, recursively convert each element
    return obj.map((item) => convertUTCtoTimezone(item));
  }

  // Convert UTC date and time values to the specified timezone
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "string" && datetimePattern.test(value)) {
        const isDateTime = value.includes("T");
        const utcMoment = moment(
          isDateTime ? value : moment().format(`YYYY-MM-DD[T${value}.000Z]`)
        );
        if (utcMoment.isValid()) {
          const convertedDate = utcMoment
            .tz(timeZone)
            .format(isDateTime ? `${isoStringFormat}Z` : "HH:mm:ss");
          obj[key] = convertedDate;
        }
      } else if (typeof value === "object" && value !== null) {
        obj[key] = convertUTCtoTimezone(value); // Recursively convert nested objects
      }
    }
  }

  return obj;
};
// export const splitDatesToSlots = ({
//   availableDates,
//   duration,
//   bookingInterval,
// }: {
//   availableDates: any[];
//   duration: number;
//   bookingInterval: number;
// }) => {
//   const result = [];

//   for (const { st, et } of availableDates) {
//     let current = new Date(st);
//     while (moment(current).add(duration, "minutes").toDate() <= new Date(et)) {
//       const next = moment(current).add(bookingInterval, "minutes").toDate();
//       const end = next < new Date(et) ? next : new Date(et);
//       const newSlot = {
//         st: new Date(current).toISOString(),
//         et: new Date(end).toISOString(),
//       };
//       result.push(newSlot);
//       current = next;
//     }
//   }

//   return result;
// };

// export const mergeEmployeesSlots = ({
//   duration,
//   availableEmployees,
// }: {
//   duration: number;
//   availableEmployees: any[];
// }) => {
//   const result: any[] = [];

//   for (const employee of availableEmployees) {
//     const { bookingInterval, availableTimes } = employee;
//     const slots = splitDatesToSlots({
//       availableDates: availableTimes,
//       duration,
//       bookingInterval,
//     });
//     for (const slot of slots) {
//       const index = result.findIndex((item) => item.st === slot.st);
//       if (index === -1) {
//         const insertionIndex = result.findIndex((item) => item.st > slot.st);
//         const newSlot = {
//           st: slot.st,
//           et: slot.et,
//           employees: [employee],
//         };

//         if (insertionIndex === -1) {
//           result.push(newSlot);
//         } else {
//           result.splice(insertionIndex, 0, newSlot);
//         }
//       } else {
//         result[index].employees.push(employee);
//       }
//     }
//   }

//   return result;
// };

export const splitDatesToSlots = ({
  availableDates,
  duration,
  bookingInterval,
}: {
  availableDates: any[];
  duration: number;
  bookingInterval: number;
}) => {
  const result: any[] = [];
  availableDates.forEach(({ st, et }) => {
    let current = new Date(st).getTime();
    const endTime = new Date(et).getTime();

    while (current + duration * 60000 <= endTime) {
      const end = Math.min(current + bookingInterval * 60000, endTime);
      result.push({
        st: new Date(current).toISOString(),
        et: new Date(end).toISOString(),
      });
      current = end;
    }
  });
  return result;
};

export const mergeEmployeesSlots = ({
  duration,
  availableEmployees,
}: {
  duration: number;
  availableEmployees: any[];
}) => {
  const result = [];
  const slotsByStartTime: any = {};

  availableEmployees.forEach((employee) => {
    const { bookingInterval, availableTimes } = employee;
    const slots = splitDatesToSlots({
      availableDates: availableTimes,
      duration,
      bookingInterval,
    });

    slots.forEach((slot) => {
      if (!slotsByStartTime[slot.st]) {
        slotsByStartTime[slot.st] = {
          st: slot.st,
          et: slot.et,
          employees: [employee],
        };
      } else {
        slotsByStartTime[slot.st].employees.push(employee);
      }
    });
  });

  for (const key in slotsByStartTime) {
    result.push(slotsByStartTime[key]);
  }

  // Assuming result needs to be sorted by start time
  return result.sort(
    (a, b) => (new Date(a.st) as any) - (new Date(b.st) as any)
  );
};

export const isNextSlotAvailable = ({
  availableTimes,
  serviceStartTime,
  serviceEndTime,
}: any) => {
  return availableTimes.some(({ st, et }: any) => {
    return (
      moment(st).isSameOrBefore(serviceStartTime) &&
      moment(et).isSameOrAfter(serviceEndTime)
    );
  });
};
