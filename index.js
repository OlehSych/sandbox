export function isObject(item) {
  return (typeof item === 'object') && !Array.isArray(item);
}

export function copyFunction(fn) {
  const temp = function temporary(...args) {
    return fn.apply(this, args);
  };

  Object
    .keys(fn)
    .forEach((key) => {
      temp[key] = fn[key];
    });

  return temp;
}

export default {
  isObject,
  copyFunction,
};
