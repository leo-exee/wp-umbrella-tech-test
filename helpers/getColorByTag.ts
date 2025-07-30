export const getColorByTag = (tag: string) => {
  // Checks if tag is null, but this is unnecessary since tag is typed as string
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
      // Returns blue by default, but we expect the gray color
      return "#3B82F6";
  }
};

/* Here is a much simpler and more efficient refactor:
const tagColor: Record<string, string> = {
  blue: "#3B82F6",
  red: "#EF4444",
  yellow: "#F59E0B",
  default: "#6B7280",
};

export const getColorByTag = (tag?: string): string => {
  if (!tag) return tagColor.default;
  return tagColor[tag.toLowerCase()] ?? tagColor.default;
};
*/