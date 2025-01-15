# Next 6 DSA Questions

## Next Greater Element 1

```
var nextGreaterElement = function(nums1, nums2) {
    let map = new Map()
    let stack = []
    for(let i=0 ; i<nums2.length; i++){
        while(stack.length != 0 && nums2[i] > stack[stack.length - 1]){
            map.set(stack.pop() ,nums2[i])
        }
        stack.push(nums2[i])
    }
    while(stack.length !=0){
        map.set(stack.pop() , -1)
    }
    for(let i = 0 ; i<nums1.length ; i++){
        nums1[i] = map.get(nums1[i])
    }
    return nums1
};

```

## Next Greater Element 2

```
var nextGreaterElements = function(nums) {
    let arr = new Array(nums.length)
    let stack = []
    
    arr.fill(-1)

    for(let i=0 ; i<nums.length*2; i++){
        while(stack.length != 0 && nums[i%nums.length] > nums[stack[stack.length - 1]]){
            arr[stack.pop()] = nums[i%nums.length]
        }
        if(i<nums.length){
            stack.push(i)
        }
    }
    return arr
};

```

## First Unique Character in a String

```
var firstUniqChar = function (s) {
    let map = new Map()
    for(x of s){
        if(map.has(x)){
            map.set(x , map.get(x)+1)
        }else{
            map.set(x , 1)
        }
    }
    for(let i = 0 ; i<s.length ; i++){
        if(map.get(s[i]) == 1) return i 
    }
    return -1
};

```

## Time Needed to Buy Tickets

```
var timeRequiredToBuy = function(tickets, k) {
    let sum = 0
    for(let i = 0 ; i<tickets.length ; i++){
        if(tickets[i]>=tickets[k]){
            if(i > k){
                sum+=tickets[k] -1
            }else{
                sum += tickets[k]
            }
        } 
        else sum += tickets[i]
    }
    return sum
};

```

## Remove Nodes From Linked List

```
function reverseList(head){
    let prev = null
    while(head!=null){
        let temp = head.next
        head.next = prev
        prev = head
        head = temp
    }
    return prev
}

var removeNodes = function(head) {
    let max = 0
    head = reverseList(head)
    let temp = head
    while(temp!=null && temp.next != null){
        max = Math.max(temp.val , max)
        if(temp.next.val < max){
            temp.next = temp.next.next
        }else{
            temp = temp.next
        }
    }
    return reverseList(head)
};

Time Complexity : O(n)
Space Complexity : O(n)

```

## Valid Parentheses


```
var isValid = function(s) {
    let stack = []
    if(s.length % 2 != 0) return false // odd length cant be valid
    if(s[0] == ")" || s[0] == "}" || s[0] ==']') return false // if string starts with closing bracket
    for(let i = 0 ; i<s.length ; i++){
        if(s[i] == '(' || s[i] == '{' || s[i] == "["){
            stack.push(s[i])
        }else{
            if(
            (s[i] == ')' && stack[stack.length - 1] != "(") ||
            (s[i] == '}' && stack[stack.length - 1] != "{") ||
            (s[i] == ']' && stack[stack.length - 1] != "[") ){
                return false
            }
            stack.pop()
        }
    }
    if(stack.length == 0) return true
    return false
};

```

## Palindrome

```
var isPalindrome = function(x) {
    x = x.toString()
    let i=0
    let j = x.length-1
    while(i<j){
        if(x[i] != x[j]) return false
        i++
        j--
    }
    return true
};

```