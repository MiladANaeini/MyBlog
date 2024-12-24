export const isEmpty = <T>(arr: T[]) => {
  return Array.isArray(arr) && arr.length === 0;
};
