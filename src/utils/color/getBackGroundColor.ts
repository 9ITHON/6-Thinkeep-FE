export const getBackGroundColor = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: "bg-primary",
    background: "bg-background",
    black: "bg-black",
    white: "bg-white",
    gray1: "bg-gray1",
    gray2: "bg-gray2",
    gray3: "bg-gray3",
    blue: "bg-blue",
    red: "bg-red",
    popup: "bg-popup-bg",
  };

  return colorMap[color] ?? "";
}


export default getBackGroundColor;