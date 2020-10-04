import mergeSort from '../src/mergeSort';

describe('Array sorting using merge sort method', () => {
  const emptyArr = [];
  const arrOneNum = [1];
  const arr = [1, -5, 3, -6, -43, 12, 7];
  const sortedAscArr = [-43, -6, -5, 1, 3, 7, 12];
  const sortedDescArr = [12, 7, 3, 1, -5, -6, -43];
  const sortedAbsArr = [1, 3, -5, -6, 7, 12, -43];
  const compareDesc = (v1, v2) => v1 > v2;
  const compareAbs = (v1, v2) => Math.abs(v1) < Math.abs(v2);

  it('Should return the same array if there is less than two numbers', () => {
    expect(mergeSort(emptyArr)).toEqual(emptyArr);
    expect(mergeSort(arrOneNum)).toEqual(arrOneNum);
  });

  it('Should sort the array ascending', () => {
    expect(mergeSort(arr)).toEqual(sortedAscArr);
  });

  it('Should sort the array descending', () => {
    expect(mergeSort(arr, compareDesc)).toEqual(sortedDescArr);
  });

  it('Should sort the array absolutely', () => {
    expect(mergeSort(arr, compareAbs)).toEqual(sortedAbsArr);
  });
});
