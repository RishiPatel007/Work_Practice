# Optimised DSA Questions/Answers with Proper Comments and Time/Space complexities

## Middle of the Linked List

```
var middleNode = function(head) {
    let slow = head
    let fast = head
    while(fast!=null && fast.next != null){
        slow = slow.next
        fast = fast.next.next // when fast will reach last or null , slow must be at mid
    }
    return slow
    // Time Complexity : O(n)
    // Space Complexity : O(1)
};

```

## Find N Unique Integers Sum up to Zero

```
var sumZero = function (n) {
  let arr = [];
  if (n == 1) {
    return [0];
  }
  for (let i = 1; i <= Math.floor(n / 2); i++) { //Generating half +ve integers like 1,2,3
    arr.push(i);
  }
  for (let x = 0; x < arr.length; x++) { // Generating other half as -ve integers like -1,-2,-3 to cancel out +ve ones
    arr.push(-arr[x]);
  }
  if (n % 2 != 0) { // if requirement is odd , just add one 0
    arr.push(0);
  }
  return arr;
    // Time Complexity : O(n)
    // Space Complexity : O(n)
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
    if(arr[middle]>target){ // At last of binary search , if element is not found then it must be on either side of middle so left or right
        return middle
    }else{
        return middle + 1
    }
}
var searchInsert = function(nums, target) {
    return binarySearch(nums , target)
    // Time Complexity : O(log(n))
    // Space Complexity : O(1)
};

```

## Second Largest

```
class Solution {
    getSecondLargest(arr) {
        let largest = -1
        let second_largest = -1
        for (let i=0 ; i<arr.length ; i++){
            if(arr[i] > largest){ // if we found a bigger number than largest then change both second largest and largest
                second_largest = largest
                largest = arr[i]
            }else if(arr[i]<largest && arr[i] > second_largest){ // if a number is less than largest but is bigger than 2nd largest then also change second largest like suppose largest is 35 and current number is 34 , so change second largest to 34
                second_largest = arr[i]
            }
        }
        return second_largest
    }
    // Time Complexity : O(n)
    // Space Complexity : O(1)
}

```

## Two Sum

```
var twoSum = function (nums, target) {
    let map = new Map()
    //Suppose we want to find 6
    for (let i = 0; i <= nums.length; i++) {
        if (map.has(target - nums[i])){ // storing current number like suppose its 2 then (6-2) = 4 , if in future 4 happens to come then the stored 2 will help as (6-4) = 2
            return [map.get(target - nums[i]) , i]
        }else{
            map.set(nums[i] , i)
        }
    }
    // Time Complexity : O(n)
    // Space Complexity : O(n)
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
        if(nums[left] <= nums[middle]){ // Here its checking which half is sorted left or right (as one of them must be sorted)
            if(nums[left]<= target && target < nums[middle]){ // Then checks if target is present in sorted half or not and according to that we can determine on which half target is
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
    // Time Complexity : O(log(n))
    // Space Complexity : O(1)
};

```

## Merge Sorted Array

```
var merge = function (nums1, m, nums2, n) {
    let i = m - 1
    let j = n - 1
    let k = m + n - 1
    //Here we traverse from reverse because from front overwriting issue was occuring so yea
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
    while(j>=0){ // If any element for j is not placed then its done at the last here
        nums1[k] = nums2[j]
        j--
        k--
    }
    // Time Complexity : O(m+n) or O(k)
    // Space Complexity : O(1)
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
    // Time Complexity : O(n)
    // Space Complexity : O(1)
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
    // Time Complexity : O(nlog(n) + n2) or O(n2)
    // Space Complexity : O(n)
};

```

## Longest Valid Parentheses

```
var longestValidParentheses = function(s) {
    let left = 0
    let right = 0
    let max = 0
    for(let i = 0 ; i<s.length ; i++){
        if(s[i] == "("){
            left ++
        }else{
            right ++
        }
        if(left == right){
            max = Math.max(max , left * 2 )
        }else if(right > left){
            left = 0
            right = 0
        }
    }
    left = 0
    right = 0
    for(let i = s.length - 1 ; i>=0 ; i--){
        if(s[i] == ")"){
            right ++
        }else{
            left ++
        }
        if(left == right){
            max = Math.max(max , right * 2 )
        }else if(left > right){
            left = 0
            right = 0
        }
    }
    return max
    // Time Complexity : O(n)
    // Space Complexity : O(1)
};


```
