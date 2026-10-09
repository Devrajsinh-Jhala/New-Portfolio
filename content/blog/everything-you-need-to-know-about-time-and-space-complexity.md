---
title: "Everything you need to know about Time and Space Complexity"
date: 2022-06-07
topic: algorithms
summary: "Time and Space Complexity explained in depth with an example"
original: https://devraj-jhala.hashnode.dev/everything-you-need-to-know-about-time-and-space-complexity
---

Time Complexity is very important and is the first step to understanding the difference between various Algorithms and appreciating their existence!

So now the question arises, what is “Time Complexity”??

Many people confuse Time Complexity with the total amount of time taken by an algorithm to finish execution but that is wrong!!!

> Time Complexity is a relationship that tells us how the time taken by an algorithm to run will grow according to our input size.

Let’s understand it by an example:

-   Suppose an algorithm takes 10 seconds to run on an old laptop but the same algorithm takes 1 sec to run in Intel core i7 then the time complexity may or may not be the same but you cannot claim that it is less in the 2nd case as it is taking less time.

    -   Remember once again Time Complexity is not the time taken by the algorithm to finish the execution

`Note: Graphs and their slopes are shown for demonstration only and actual graph may vary according to calculations.`

-   Below table will help you understand it more clearly:

| Time Taken by old machine | Input Size |
| --- | --- |
| 10 | 10 |
| 100 | 100 |
| 1000 | 1000 |
| 10000 | 10000 |

![Image3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654405389131/wa3xV6YPU.png)

---

| Time Taken by i7 | Input Size |
| --- | --- |
| 1 | 10 |
| 10 | 100 |
| 100 | 1000 |
| 1000 | 10000 |

![Image4.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654405406928/ypHHJmjiw.png)

---

From the above graphs, you observe that though the time taken is less in the latter but both follow the same relations that are linear, so for input size of N, Output can be predicted by looking at the graph hence we can say that Time Complexity is **O(N)**.

## Now let’s see what are the O() notation:

So these notations are called Asymptotic Notations which are nothing but mathematical representations of the Time Complexity we just calculated, So let's look at them one by one:

### 1\. Big-O Notation:

-   Big-O denotes the upper bound of the algorithm, this simply means that if any algorithm in the worst case will have N^2 then it cannot exceed that.

-   It can be less or equal but will not exceed the limit hence it is widely used because in the real world we handle very large datasets hence we always check the worst case first!

### 2\. Big-Theta Notation:

-   Big-Theta is like a combination of both upper and lower bounds.

### 3\. Big-Omega Notation:

-   Big-Omega is just the opposite of Big-O as it denotes the lower bound of the algorithm.

-   So if any algorithm has a relation to Theta(N) then it means that the algorithm will at least grow linearly, it can grow in a quadratic fashion, cubic, etc. but it won't grow less than linear.

---

#### Some Points to remember while calculating Time Complexity:

1.  We always care about large data (because in real life we have to deal with millions of users) and so to check and compare different Time complexities, use large data.

2.  We ignore constants when we finally calculate the Time Complexity.

3.  We ignore less dominating terms while calculating the Time Complexity.

Now let's understand the above points with examples:

![Imag5.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654405705752/dss-4pDG6.png)

In the above, you observe 2 relations, y = 2x and y = 2x + c (where c can be any constant), so if you draw such a relation for Time taken vs Input then the values of time will be different but both follow the same relation that is Linear (O(N)).

> Hence from the above example, we prove that we ignore constants when we derive the Time Complexity.

-   Suppose we have a Time Complexity given to us as O(N^4 + N) then let's check for N=100 O((100)^4 + 100) = O(10^8 + 100)

Now you see 100 is very small compared to 10^8 hence we ignore it and so our new and correct Time Complexity will become O(N^4)!

---

# Space Complexity:

Space complexity is the total space taken by the Algorithm concerning the input size.

It means,

> Space Complexity = Extra Space taken by Algorithm + Input Size

But input size is user-dependent so we can never really know its value hence we generally calculate Space Complexity as the `extra space or Auxiliary space taken by the Algorithm`.

Hence you see sometimes written that Space complexity is extra space taken by the Algorithm which is not true but since we cannot know the input size, we just take it.
