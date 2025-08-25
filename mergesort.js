const mergeSort = (array) => {
  if (array.length <= 1) return array;
  let mid = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));
  let sorted = [];
  let i = 0,
    y = 0;
  while (i < left.length && y < right.length) {
    if (left[i] <= right[y]) {
      sorted.push(left[i]);
      i++;
    } else {
      sorted.push(right[y]);
      y++;
    }
  }
  return sorted.concat(left.slice(i)).concat(right.slice(y));
};

let arrayOne = [3, 2, 1, 13, 8, 5, 0, 1];
let arrayTwo = [105, 79, 100, 110];

console.log(mergeSort(arrayOne));
console.log(mergeSort(arrayTwo));
