---
title: "All you need to know about Cycle Sort"
date: 2022-06-02
topic: algorithms
original: https://devraj-jhala.hashnode.dev/all-you-need-to-know-about-cycle-sort
---

# Basic Idea:

-   Here we start traversing from left to right of the array and check how many elements are smaller than the current element, if not smaller, we continue else we swap the current element at index **(Number of smaller elements)**th

-   This whole process forms a cycle structure hence the name Cycle Sort.

-   It is the only algorithm that does optimal (minimal) memory writes because here value is written either 0 times (if the item is at the correct position) or 1 time (putting that item in correct order).

-   It is In-place (Does not use auxiliary space) and unstable(relative order of similar elements may change during sorting)

---

# Algorithm:

Start from 1st element and compare it with all the elements If no smaller element than it is found move to the next element If such an element is found we increment the count and place that element in arr\[count\] we store the earlier element in some variable and then repeat the above process with that variable we do this until the array is sorted

---

# Applications:

-   Prefered when memory writes are costly

-   Used in questions where you have to sort an array with minimum swaps

---

# Example:

![cs1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1653887956615/dqnCreyhO.png)

![cs2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1653887964827/xARgIWYXp.png)

---

# Code:

```c++

void cycleSort(int arr[], int n)

{

    // traverse array elements from left to right and put it on

    // the right place

    for(int cycleStart = 0; cycleStart < n - 1; cycleStart++) {

        // initialize item as a starting point

        int item = arr[cycleStart];

        // count all smaller elements on the right side of the item.

        int pos = cycleStart;

        for(int i = cycleStart + 1; i < n; i++)

            if (arr[i] < item)

                pos++;

        // Case for the item already in its correct position

        if(pos == cycleStart)

            continue;

        // handling duplicate  elements

        while (item == arr[pos])

            pos += 1;

        // put the item in its right position

        if(pos != cycleStart) {

            swap(item, arr[pos]);
        }

        // We then again do the above process for the rest of the cycle

        while(pos != cycle_start) {

            pos = cycle_start;

            // Find the position where we put the element

            for (int i = cycleStart + 1; i < n; i++)

                if (arr[i] < item)

                    pos += 1;

            // Handling all duplicate  elements

            while(item == arr[pos])

                pos += 1;

            // put the item to it's right position
            if(item != arr[pos]) {

                swap(item, arr[pos]);

            }

        }

    }
```

---

# Time Complexity:

-   Time Complexity as you can judge from code is **O(n2)** in all cases.
