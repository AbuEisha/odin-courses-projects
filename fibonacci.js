const fibs = (n) => {
  let arr = [0, 1];
  let i = 0;
  while (i < n - 2) {
    arr.push(arr[i] + arr[i + 1]);
    i++;
  }
  return arr;
};

console.log(fibs(8));
console.log(fibs(10));
console.log(fibs(20));

const fibsRec = (n) => {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const seq = fibsRec(n - 1);
  seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  return seq;
};

console.log(fibsRec(8));
console.log(fibsRec(10));
console.log(fibsRec(20));
