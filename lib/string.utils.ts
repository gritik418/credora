export const getInitials = (name: string, count = 2) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, count)
    .join("")
    .toUpperCase();
};
