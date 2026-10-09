---
title: "Stack Demystified"
date: 2022-07-26
topic: algorithms
original: https://devraj-jhala.hashnode.dev/stack-demystified
---

Hello everyone, welcome to today's blog where we will be discussing **Stack** data structure. You see the concept of stack appears very simple and we see a lot of stacks in our daily life like stacks of coins, stacks of plates, etc. A lot of people including me earlier have difficulty understanding of stack, how its pointers move, how to implement... and it goes on. Basically a little hard to understand. So let's remove that and understand stack data structure at its core so that we can tackle every concept and problem of it.

# Introduction:

## Last In First Out (LIFO):

To understand Stack, we first need to understand the LIFO principle as it serves as the basis of the Stack. LIFO as mentioned in the title stands for **Last In First Out** which means who got last will get out first. In real life you can observe this principle by putting a stack of coins, now you will observe that you can only pick the last coin first otherwise the stack will break.

![ibrahim-rifath-OApHds2yEGQ-unsplash.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1658127507847/LODXuKMKNM.jpg)

## Stack as a data structure:

Let's look at what the definition of stack says:

> A stack is a linear data structure that follows the principle of **Last In First Out (LIFO)**. This means the last element inserted inside the stack is removed first.

So, with that thing cleared, let's look at some basic terms/operations regarding stack:

> Push: Add an element on top of the stack Pop: Remove element from the top of the stack isFull: Check if the stack is full or not isEmpty: Check if the stack is empty or not

## Working of the Stack:

Now if you have the above points in mind then working on the stack will be really easy for you:

> We maintain a pointer `TOP` to keep track of the size of the stack

1.  Because the stack is empty initially, we give the value of TOP as -1.

2.  Now as we insert the content from top to stack we just increment the value of the TOP pointer. If the top pointer reaches the max limit of the stack, we restrict further pushing.

3.  Similarly if we want to pop the element, we just need to decrease the value of TOP, but we need to make sure we only pop till the value of TOP is greater than -1.

![Image 1.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1658127471831/ZEmUHYkMq.PNG)

---

# Implementation:

Let's build a stack using an array in C++, here we will just learn about the implementation of push, pop, and display (function to display all elements in the stack)

## Code:

```c++

#include <iostream>
using namespace std;

int stack[10], size=10, top = -1; // Declaring TOP pointer as well as size of stack

// function to push an element on top of stack
void pushToStack(int value) {
   if(top >= size-1)
   cout<<"Stack is Full... Cannot Insert more"<<endl;
   else {
      top++;
      stack[top]=value;
   }
}

// function to pop an element from the top of the stack
void popFromStack() {
   if(top <= -1)
   cout<<"Stack is Empty... Cannot pop more"<<endl;
   else {
      cout<<"The popped element is "<< stack[top] <<endl;
      top--;
   }
}

// function to display the items in the stack
void displayTheElements() {
   if(top >= 0) {
      cout<<"Stack elements are:";
      for(int i=top; i>=0; i--)
      cout<<stack[i]<<" ";
      cout<<endl;
   } else
   cout<<"Stack is empty";
}

int main(){
	pushToStack(3)
	pushToStack(4)
	pushToStack(6)

	displayTheElements() // Output: 6 4 3

	popFromStack() // Output: The popped element is 6

	return 0
}
```

## Time Complexity:

-   For the array-based implementation of a stack, the push and pop operations take constant time, i.e. `O(1)`.

---

# Applications:

-   It can be used for systematic Memory Management.

-   **To reverse a word** - Put all the letters in a stack and pop them out. Because of the LIFO order of the stack, you will get the letters in reverse order.

-   **In compilers** - Compilers use the stack to calculate the value of expressions like `6 + 4 / 5 * (7 - 9)` by converting the expression to prefix or postfix form.

-   **In browsers** - The back button in a browser saves all the URLs you have visited previously in a stack. Each time you visit a new page, it is added to the stack. When you press the back button, the current URL is removed from the stack, and the previous URL is accessed.

# Advantages:

-   Stack is easy to learn and implement for beginners.

-   Stacks are used to solve problems that work on recursion.

-   It allows you to control how memory is allocated and deallocated.

# Disadvantages:

-   Random access to elements is impossible in stacks.

-   Stacks are rigid and are not scalable.
