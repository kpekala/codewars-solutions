exports.comp = (array1, array2) => {
  if (!array1 && !array2) return true;
  if ((!array2 && array1.length === 0) || (!array1 && array2.length === 0))
    return false;
  array1.sort((a, b) => a - b);
  array2.sort((a, b) => a - b);
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] * array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};
