export function isObject(item) {
  return (typeof item === 'object') && !Array.isArray(item);
}

export default {
  isObject,
};
