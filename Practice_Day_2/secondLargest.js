function getLargest(arr) {
  largest = 0;
  for (x of arr) {
    if (x > largest) {
      largest = x;
    }
  }
  return largest;
}
class Solution {
  getSecondLargest(arr) {
    let largest = getLargest(arr);
    arr = arr.filter((val) => val != largest);
    if (arr.length == 0) {
      return -1;
    } else {
      return getLargest(arr);
    }
  }
}
