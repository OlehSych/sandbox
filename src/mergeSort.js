import randArray from './randArray';

const randArr = randArray(10, 0, 100);

function compareAsc(v1, v2) {
  return v1 < v2;
}

export default function mergeSort(arr, compare) {
  if (arr.length === 1) {
    return arr;
  }

  const splitInd = Math.floor(arr.length / 2);
  const part1 = mergeSort(arr.slice(0, splitInd));
  const part2 = mergeSort(arr.slice(splitInd));
  const newArr = [];

  for (let i = 0; i < part1.length; i++) {
    for (let j = 0; j < part2.length; j++) {
      if (compare(part1[i], part2[j])) {
        newArr.push(part1[i]);
      }
    }
  }

  return newArr;
}

console.log(mergeSort(randArr, compareAsc));
