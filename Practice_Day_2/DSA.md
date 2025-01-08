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

## Search in Rotated Sorted Array
```
var search = function(nums, target) {
    for(let i=0 ,j=nums.length-1; i<=nums.length , j>=0; i++ , j--){
        if(nums[i] == target){
            return i
        }
        if(nums[j] == target){
            return j
        }
    }
    return -1
};

```

## Merge Sorted Array


```
var merge = function(nums1, m, nums2, n) {
    let i = m-1
    let j = n-1
    let k = m+n-1
    while(i>=0 && j>=0){
        if(nums1[i] > nums2[j]){
            nums1[k] = nums1[i]
            i--
        }else{
            nums1[k] = nums2[j]
            j--
        }
        k--
    }
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
};

```



## Maximum Subarray

```
var maxSubArray = function(nums) {
    let current_sum = 0;
    let max = Number.NEGATIVE_INFINITY

    for(let i=0 ; i<nums.length ; i++){
        current_sum +=nums[i]
        max = Math.max(max , current_sum)

        if(current_sum < 0){
            current_sum = 0
        }
    }
    return max
};

```