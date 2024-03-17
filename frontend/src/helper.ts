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

  // Convert milliseconds to days, months, and years
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30.436875; // Average number of days in a month
  const millisecondsPerYear = millisecondsPerDay * 365.25; // Average number of days in a year

  const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
  const monthsAgo = Math.floor(timeDifference / millisecondsPerMonth);
  const yearsAgo = Math.floor(timeDifference / millisecondsPerYear);

  if (daysAgo > 365) {
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo > 30) {
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  }
}
