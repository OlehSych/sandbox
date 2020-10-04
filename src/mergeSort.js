export default function mergeSort(arr, compare = (v1, v2) => v1 < v2) {
  if (arr.length === 1) {
    return arr;
  }

  const splitInd = Math.floor(arr.length / 2);
  const part1 = mergeSort(arr.slice(0, splitInd), compare);
  const part2 = mergeSort(arr.slice(splitInd), compare);
  const newArr = [];

  do {
    newArr.push(compare(part1[0], part2[0]) ? part1.shift() : part2.shift());
  } while (part1.length && part2.length);

  newArr.push(...(part1.length ? part1 : part2));

  return newArr;
}
