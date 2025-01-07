## Middle of the Linked List

```
var getLength = function (head) {
  count = 0;
  while (head != null) {
    count++;
    head = head.next;
  }
  return count;
};

var middleNode = function (head) {
  let iteration = Math.floor(getLength(head) / 2);
  for (let i = 0; i < iteration; i++) {
    head = head.next;
  }
  return head;
};
```

## Find N Unique Integers Sum up to Zero

```
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
 
```

## Search Insert Position


```
var searchInsert = function(nums, target) {
    for(let i=0 ; i<nums.length ; i++){
        if(nums[i] == target || nums[i]>target){
            return i
        }
    }
    return nums.length
};

```

## Second Largest

```
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

```


## Two Sum

```
var twoSum = function (nums, target) {
  for (let i = 0; i <= nums.length; i++) {
    for (let j = i + 1; j <= nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
};

```