---
title: "Introduction to TailwindCSS"
date: 2022-12-11
topic: tailwind
summary: "In this blog, we will look at the introduction of the TailwindCSS and why it is used"
original: https://devraj-jhala.hashnode.dev/introduction-to-tailwindcss
---

Hello all, Welcome to the first blog of this series where we will be learning TailwindCSS from scratch to the point where you will be able to build websites easily using TailwindCSS. Firstly we will learn a bit about what is TailwindCSS. , why use it? how to use it and later we will learn about its installation, classes, and how to make a responsive website combining all the concepts we will be learning in the course.

I will keep the blogs short and informative to make sure you gain maximum knowledge in the minimum amount of time. Not only I will teach you TailwindCSS but also I will guide you on how to read and understand documentation and various tips and tricks as well so that you don't need to refer to anything extra after this course. Once again thank you for showing interest in this series and you can expect 2 blogs a week on this series.

Now that all the prerequisites are clear, let's start by first learning what is TailwindCSS.

## Atomic Classes or Utility Classes

As the name suggests, atomic classes follow **Atomic CSS**.

> Atomic CSS is an approach to CSS writing that encourages small CSS classes specifically to perform one function

Example:

```css
.blue-button{
	background-color: blue;
	color: white;
}
```

Here the blue-button class can be considered an atomic class because its only function is to make a blue button.

Now that we know what are atomic classes let's understand what are Utility Classes:

*   Again as the name suggests, Utility classes are classes that are designed to perform only specific tasks. Let's say a class for setting the margin top and bottom to 5px.

*   Now as you might have guessed preparing such classes for even a small project is very tedious and time-consuming.

And that's where TailwindCSS comes to the rescue

## What is TailwindCSS

According to the official documentation, TailwindCSS is a <mark>utility-first CSS framework </mark> packed with utility classes. TaiwindCSS has pre-built utility classes like:

```css
.flex{
	display: flex;
}

.flex-col{
	flex-direction: column;
}
```

## Why use TailwindCSS:

Now that we have understood what are utility classes and TailwindCSS, let's look at some of the major reasons why TailwindCSS is preferred by developers.

1.  Productivity:

    *   If you have built any HTML or CSS website, the typical workflow would be first writing the content and layout with HTML and then styling it with CSS.

    *   Problem is that we have to leave the HTML file, style CSS again come to HTML for the class name, and again switch to CSS

    *   This process is not only frustrating but also harder to debug for large projects. In TailwindCSS, we write classes in the HTML file itself, and hence we would never have to leave the HTML file. An example of a such method is given below:

        ```html
        <div class="flex flex-col items-center justify-center">
        	<!-- Some HTML Code -->
        </div>
        ```

    *   Here flex, flex-col, etc. are utility classes that we saw in the above section

2.  Faster build times:

    *   TailwindCSS comes with a Just In Time (JIT) compiler. The JIT compiler avoids compiling all the CSS written upfront but instead compiles only the CSS whenever needed.

    *   Also in the production, it removes all the unused classes resulting in the production CSS bundle of size just **5-10 kB**.

3.  Customizability:

    *   Although TailwindCSS comes with pre-defined classes, In TailwindCSS everything is customizable using square bracket notations and tailwind.config file which we will look into in further chapters of this series.

4.  No need to think of class names:

    *   Naming classes can be a very difficult thing, especially for large projects and collaborative teams whereas in TailwindCSS class names do not have to be written as we saw in the above example.

Because of such many more advantages, is why TailwindCSS shines! The next blog will look at installing TailwindCSS on HTML, and React.js projects. Thank you for taking the time to read this blog, I hope you got some value from it.
