# Next 6 DSA Questions

## Roman To Integer

```
var romanToInt = function(s) {
    let conversion = {
        "M" : 1000,
        "D" : 500,
        "C" : 100,
        "L" : 50,
        "X" : 10,
        "V" : 5,
        "I" : 1
    }
    let count = 0
    for(let i=0 ; i<s.length ; i++){
        if(conversion[s[i]] < conversion[s[i+1]]){
            count += conversion[s[i+1]] - conversion[s[i]]
            i++
        }else{
            count += conversion[s[i]]
        }
    }
    return count
};

```

## Longest Common Prefix

```
var longestCommonPrefix = function(strs) {
    if(strs.length == 1){
        return strs[0]
    }
    for(let i = 0 ; i<strs[0].length ; i++){
        for(let j = 1 ; j<strs.length ; j++){
            if(strs[0][i] != strs[j][i]){
                return strs[0].slice(0,i)
            }
        }
    }
    return strs[0]
};

```