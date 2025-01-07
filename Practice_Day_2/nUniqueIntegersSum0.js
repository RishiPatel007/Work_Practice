var sumZero = function (n) {
  let arr = [];
  if (n == 1) {
    return [0];
  }
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    arr.push(i);
  }
  let len = arr.length;
  for (let x = 0; x < len; x++) {
    arr.push(-arr[x]);
  }
  if (n % 2 != 0) {
    arr.push(0);
  }
  return arr;
};
