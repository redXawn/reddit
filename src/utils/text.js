export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatCountNumber = (value) => {
  if (!value) return 0;
  if (value >= 1000) {
    const formattedNumber = (value / 1000).toFixed(1);
    return `${formattedNumber}k`;
  }
  return value.toString();
};
