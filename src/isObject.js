export default function isObject(item) {
  return item !== null
    && typeof item === 'object'
    && !Array.isArray(item);
}
