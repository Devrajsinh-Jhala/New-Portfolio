---
title: "How to get the Largest SubArray Sum in Linear Time?"
date: 2022-06-14
topic: algorithms
summary: "Kadane's Algorithm to find Largest SubArray Sum in Linear Time"
original: https://devraj-jhala.hashnode.dev/how-to-get-the-largest-subarray-sum-in-linear-time
---

# Kadane's Algorithm for Largest Subarray Sum:

-   Kadane's Algorithm is quite a popular algorithm for finding the largest sum of SubArrays in linear time with constant Space Complexity.

-   So now first let's see what are SubArrays:

## What are SubArrays:

-   As the name suggests, SubArrays are Subset of Arrays or SubArrays are **Contiguous** part of Arrays.

-   Let's look at an example for better understanding:

![Image1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654958892243/jIVRC9uSX.png)

Now that we have an understanding of what SubArrays are, let's look at What is the problem that we have to solve:

---

## Problem:

We have to find the largest SubArray Sum in the given array of integers

## Approaches or Solutions:

### 1\. Naive Approach or Brute Force Approach:

#### Idea:

-   We run two nested loops to traverse each element and for each element, we find its sum with other elements. We update the Maximum Sum as soon as we get a larger value.

-   After completion, we will get the maximum sum of the subarray.

-   Time Complexity: O(N2) and Space Complexity: O(1) where N = Number of elements in the Array

#### Code:

```c++
#include <algorithm>

#include <iostream>

#include <bits/stdc++.h>

using namespace std;

int maximumSubarraySum(vector < int > array) {

  int length = array.size();

  int maxSum = INT_MIN;

  for (int i = 0; i <= length - 1; i++) {

    int currSum = 0;

    for (int j = i; j <= length - 1; j++) {

      currSum += arr[j];

      if (currSum > maxSum) {

        maxSum = currSum;

      }

    }

  }

  return maxSum;

}
```

---

### 2\. Efficient Approach:

#### Idea:

-   We maintain two pointers, maxSum (For finding maximum Sum) and currSum(For finding current Sum).

-   We traverse through the array once and we do the following:

    -   If we get the positive element, we add it to currentSum and check if maxSum &lt; currSum:

        -   If yes, we update the maxSum to currSum else we just move on

    -   If we get a negative element, we initialize currentSum to zero again

-   Time Complexity: O(n), Space Complexity: O(1)

#### Code:

```c++

int maximumSubarraySum(int arr[], int n) {

 int maxSum = 0;

 int currSum = 0;

 for (i = 0; i <= n - 1; i++) {

   currSum += arr[i];

   if (currSum > maxSum) { // If current sum is greater than maxSum, we update it

     maxSum = currSum;

   }

   if (currSum < 0) { // If we get a negative, we update currSum = 0

     currSum = 0;

   }

 }

 return maxSum;

}
```

---

### 3\. Modified Kadane's Approach:

-   Above approach will return 0 if the entire array is of negative elements, So the only modification will be to initialize **maxSum = INT\_MIN** (INT\_MIN is a C++ variable that denotes a huge negative value (**\-2147483647 - 1**)).

#### Code:

```c++

int maximumSubarraySum(int arr[], int n) {

 int maxSum = INT_MIN;

 int currSum = 0;

 for (i = 0; i <= n - 1; i++) {

   currSum += arr[i];

   if (currSum > maxSum) { // If current sum is greater than maxSum, we update it

     maxSum = currSum;

   }

   if (currSum < 0) { // If we get a negative, we update currSum = 0

     currSum = 0;

   }

 }

 return maxSum;

}
```

## Example:

![Image2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654959018049/RbGVrqDZB.png)
