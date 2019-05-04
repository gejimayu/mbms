export const doesObjExistOnArray = (arr, obj, attr) => {
  return arr.find(a => a[attr] === obj[attr]);
}