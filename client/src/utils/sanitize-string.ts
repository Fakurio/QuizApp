export const sanitizeString = (str: string) => {
  return str.replace(/&(#\d+|[a-zA-Z]+);/g, "");
};
