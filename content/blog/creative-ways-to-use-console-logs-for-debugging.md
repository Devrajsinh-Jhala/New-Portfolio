---
title: "Creative Ways to use console logs for debugging"
date: 2022-07-19
topic: web
original: https://devraj-jhala.hashnode.dev/creative-ways-to-use-console-logs-for-debugging
---

Hello everyone! Welcome to my blog, today we will be discussing about some creative ways to use console.log() for debugging. You see as developers, we use consoles for debugging a lot no matter what language, framework or domain we are working in. For front end development we use console logs for debugging and back end developers use console for watching the changes in the console.

Let's first discuss about console logs and how effectively we can use it effectively:

# 1\. Using brackets in console log:

First way to use console log effectively is to use brackets to display the content along with variable name. It makes it easier to track down in the log what value came from where.

```js
    var variable = 2;

    console.log(variable); // 2

    console.log({ variable }); // variable: 2
```

![Image 1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1657812921700/8fBUTzBzA.png)

# 2\. Styling the console log:

Using **%c** specifier lets you style the log message with CSS. This can be very helpful when you have multiple statements to log during development.

```js
    console.log("%cHi How are you?", "color:red");
```

![Image 2.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1657812932626/pzWKl4IZB.PNG)

# 3\. Grouping the console logs:

You can group a bunch of console logs together by using console.group()

```js
    const label = "Domains of Development";

    console.group(label);

    console.log("Front End");

    console.log("Back End");

    console.log("Full Stack");
```

![Image 3.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1657812941103/LOjjVjh1Y.PNG)

# 4\. Using different methods:

You can divide the console logs into different sections like you can use console.error() to display the message in the error section. This is again helpful when you have to use too many logs for debugging.

```js
    console.error("This is an error message");

    console.info("This is an info message");

    console.warn("This is a warning message");
```

![Image 4.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1657812959800/KhW2b17ZK.PNG)

# 5\. Using console.table() for tables:

Instead of displaying object and then finding the problem, you can display the object in the form of table using console.table().

```js
    const object = {

      name: "Devraj",

      surname: "Jhala",

      id: 1,

    };

    console.table(object);
```

![Image 5.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1657812970909/T8bqj1QmX.PNG)

# 6\. Using colors package for Node.js debugging:

For node.js, to display colorfull output we can use colors package with which we can customise the color, font weight, etc.

```js
console.log('hello'.blue); // outputs blue text
```
