function isSafeNumber(value) {
  return Math.abs(value) <= Math.sqrt(Number.MAX_VALUE);
}

function round(number, scale) {
  const divider = 10 ** scale;
  return Math.floor(number * divider) / divider;
}

export default function randArray(length, min = 0, max = 1, scale = 0) {
  const args = {
    length, min, max, scale,
  };
  const checks = [
    {
      get err() {
        return Object.keys(args).find((key) => !isSafeNumber(args[key]));
      },
    },
    {
      cond: Number.isInteger(length) && length > 0,
      err: 'length',
    },
    {
      cond: Number.isInteger(scale) && scale >= 0,
      err: 'scale',
    },
    {
      cond: max > min,
      err: 'max',
    },
  ];
  const invalidArg = checks.find(({ cond, err }) => !cond && err);

  if (invalidArg) {
    throw new Error(`Invalid argument exception: ${invalidArg.err}`);
  }

  const arr = new Array(length);
  const sc = Math.floor(scale);
  const mn = round(min, sc);
  const mx = round(max, sc);

  for (let i = 0; i < length; i++) {
    arr[i] = round(mn + Math.random() * (mx - mn), sc);
  }

  return arr;
}
