export const getKeyByValue = (object: Object, value: any) => {
  return Object.keys(object).find((key) => object[key] === value);
};
