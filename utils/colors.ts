export default function colorToHex(color: string) {
  let iconColor = "";

  const keyIndex = Object.keys(colors).findIndex((key) => key === color);
  iconColor = Object.values(colors).at(keyIndex)!;

  return iconColor;
}

export const colors = {
  red: "#EB5545",
  orange: "#F1A33C",
  yellow: "#F9D74A",
  green: "#68CD69",
  lightblue: "#8AC1F9",
  blue: "#0A84FF",
  purple: "#5D5CDF",
  magenta: "#C983EE",
  brown: "#AB7610",
};
