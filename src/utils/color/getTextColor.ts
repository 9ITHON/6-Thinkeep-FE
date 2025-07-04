export const getTextColor = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: "text-primary",
    background: "text-background",
    black: "text-black",
    white: "text-white",
    gray1: "text-gray1",
    gray2: "text-gray2",
    gray3: "text-gray3",
    blue: "text-blue",
    red: "text-red",
    popup: "text-popup-bg",
  };

  return colorMap[color] ?? "";
}


export default getTextColor;