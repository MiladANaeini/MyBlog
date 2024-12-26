export const isEmpty = <T>(arr: T[]) => {
  return Array.isArray(arr) && arr.length === 0;
};

export const formattedDate = (date: Date): string => {
  const neDate = new Date(date); // Create a Date object

  return `${neDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })}`;
};
