---
title: "Everything you need to know about Insertion Sort"
date: 2022-05-31
topic: algorithms
original: https://devraj-jhala.hashnode.dev/everything-you-need-to-know-about-insertion-sort
---

# Basic Idea :

-   We assume that the first element is already sorted and begin with 2nd element, we place it at its correct position. Here the correct position is the position of the element in the sorted array.

-   You can visualize it by holding a pack of numbered cards and placing them in order.

-   Hence as we progress, the array gets divided in two halves, one is sorted and other unsorted. So if we are at **i**th element we would have **0 to (i-1)**th elements **Sorted** and **i to (n-1)**th elements **Unsorted**.

-   Also Insertion Sort is in-place (In-place means it doesn't use any auxiliary space or we can say that space complexity is constant) and also it is Stable (Stable means the relative order of similar elements is not changed even after sorting)

Now that we have a basic idea, let's discuss the algorithm behind it:

---

## Algorithm:

```c++

for(i=0 to n){ // n = size of array
			   // arr = array
	key = arr[i]
	j = i-1
	while(j>= 0 && arr[j] > key){
		arr[j+1] = arr[j]
		j--
	}
	arr[j+1] = key
}
```

---

## Applications:

-   Preferred when the array size is small

-   Used along with other algorithms in sort functions like TimSort and IntroSort

---

## Code:

```c++
// n = size of the array
void insertionSort(int array[], int n) {
  for (int i = 1; i < n; i++) {
    int key = array[i];
    int j = i - 1;

    while (j>= 0 && arr[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
}
```

---

## Time Complexity:

-   In the worst case it compares 2nd element with all the remaining elements in the array

    -   Therefore total comparisons are:

        -   1 + 2 + ... + (n-1) = (n\*(n-1))/2

        -   Ignoring constants and less dominating terms, it gets **O(n2)**

-   In the best case, outer loop runs n times, but inner loop breaks, hence time complexity gets **O(n)**

-   Space Complexity is **Constant**
