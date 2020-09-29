import { isObject } from '..';

export default function deepCopy(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    let newVal;
    if (isObject(obj[key])) {
      newVal = deepCopy(obj[key]);
    } else if (Array.isArray(obj[key])) {
      newVal = [...obj[key]];
    } else {
      newVal = obj[key];
    }

    return {
      ...newObj,
      [key]: newVal,
    };
  }, {});
}
