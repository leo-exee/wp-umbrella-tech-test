export const getColorByTag = (tag: string) => {
  if (tag === null) {
    return "#6B7280";
  }

  switch (tag) {
    case "blue":
      return "#3B82F6";
    case "red":
      return "#EF4444";
    case "yellow":
      return "#F59E0B";
    default:
      return "#3B82F6";
  }
};
