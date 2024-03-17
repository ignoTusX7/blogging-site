export const createDate = (date: string) => {
  const d = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Format date
  const formattedDate = `${
    months[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()}`;
  return formattedDate;
};

export const readingTime = (text: string) => {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};

export function getTimeDifference(articleDate: string) {
  // Convert articleDate string to a Date object
  const publicationDate = new Date(articleDate);

  // Current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - publicationDate;

  // Convert milliseconds to seconds, minutes, hours, days, months, and years
  const millisecondsPerMinute = 1000 * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerMonth = millisecondsPerDay * (365.25 / 12); // Average number of days in a month
  const millisecondsPerYear = millisecondsPerDay * 365.25; // Average number of days in a year

  const secondsAgo = Math.floor(timeDifference / 1000);
  const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
  const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
  const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
  const monthsAgo = Math.floor(timeDifference / millisecondsPerMonth);
  const yearsAgo = Math.floor(timeDifference / millisecondsPerYear);

  if (yearsAgo > 0) {
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  } else if (monthsAgo > 0) {
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else {
    return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
  }
}
