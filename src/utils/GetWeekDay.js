export const GetWeekDay = (date) => {
  const dateObject = new Date(date);
  const dayOfWeek = dateObject.toLocaleDateString("en-US", { weekday: "long" });
  return dayOfWeek;
};

export const getIcon = (icons, name) => {
  return icons.find((icon) => icon.name === name);
};
