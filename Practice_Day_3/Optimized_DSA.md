# Optimised DSA Questions/Answers

## Middle of the Linked List

```
var middleNode = function(head) {
    let slow = head
    let fast = head
    while(fast!=null && fast.next != null){
        slow = slow.next
        fast = fast.next.next
    }
    return slow
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
function binarySearch(arr , target){
    let left = 0
    let right = arr.length - 1
    let middle = 0
    while(left <= right){
        middle = Math.floor((left + right)/2)
        if(arr[middle] == target){
            return middle
        }

        if(target < arr[middle]){
            right = middle - 1
        }else{
            left = middle + 1
        }
    }
    if(arr[middle]>target){
        return middle
    }else{
        return middle + 1
    }
}
var searchInsert = function(nums, target) {
    return binarySearch(nums , target)
};

```

## Second Largest

```
class Solution {
    getSecondLargest(arr) {
        let largest = -1
        let second_largest = -1
        for (let i=0 ; i<arr.length ; i++){
            if(arr[i] > largest){
                second_largest = largest
                largest = arr[i]
            }else if(arr[i]<largest && arr[i] > second_largest){
                second_largest = arr[i]
            }
        }
        return second_largest
    }
}

```


## Two Sum

```
var twoSum = function (nums, target) {
    let map = new Map()
    for (let i = 0; i <= nums.length; i++) {
        if (map.has(target - nums[i])){
            return [map.get(target - nums[i]) , i]
        }else{
            map.set(nums[i] , i)
        }
    }
    // Time Complexity : O(n) -- Loop is iterating only n times
    // Space Complexity : O(n) -- If all the numbers have to be stored in map
};

```

## Search in Rotated Sorted Array
```
var search = function(nums, target) {
    let left = 0
    let right = nums.length - 1
    let middle = 0

    while(left <= right){
        middle = Math.floor((left + right) / 2)
        if(nums[middle] == target){
            return middle
        }
        if(nums[left] <= nums[middle]){
            if(nums[left]<= target && target < nums[middle]){
                right = middle - 1
            }else{
                left = middle + 1
            }
        }else{
            if(nums[middle]< target && target <= nums[right]){
                left = middle + 1
            }else{
                right = middle - 1
            }
        }
    }
    return -1
};

```

## Merge Sorted Array


```
var merge = function (nums1, m, nums2, n) {
    let i = m - 1
    let j = n - 1
    let k = m + n - 1
    while(i>=0 && j>=0){
        if(nums1[i]>nums2[j]){
            nums1[k] = nums1[i]
            i--
        }else{
            nums1[k] = nums2[j]
            j--

        }
        k--
    }
    while(j>=0){
        nums1[k] = nums2[j]
        j--
        k--
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

## 3 Sum

```
var threeSum = function (nums) {
    nums.sort((a,b)=>a-b)
    let arr = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) continue
        j = i + 1
        k = nums.length - 1
        while (j < k) {
            sum = nums[i] + nums[j] + nums[k]
            if (sum < 0) {
                j++
            } else if (sum > 0) {
                k--
            } else {
                arr.push([nums[i],nums[j],nums[k]])
                j++
                k--
                while(j<k && nums[j] == nums[j-1]){
                    j++
                }
            }
        }
    }
    return arr
};

```


## Longest Valid Parentheses

```


```