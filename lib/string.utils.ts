export const getInitials = (name: string, count = 2) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, count)
    .join("")
    .toUpperCase();
};
