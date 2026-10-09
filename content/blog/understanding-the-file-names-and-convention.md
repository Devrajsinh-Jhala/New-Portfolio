---
title: "Understanding the file names and convention"
date: 2023-07-02
topic: next.js
summary: "In this article we will learn about the new file and folder conventions in the new Next.js 13 app directory and what they signify."
original: https://devraj-jhala.hashnode.dev/understanding-the-file-names-and-convention
---

Hello and welcome back to the Next.js 13 series !! In this blog, I will be explaining to you why we have to name every new route in Next.js 13 as a `page` and other naming conventions as well.

In Next.js 13, we have a [folder-based routing system](https://nextjs.org/docs/app/building-your-application/routing#file-conventions). Meaning if you want to create a route named `/about`, then you have to create a new folder named `about` in your app directory and in that `about` folder you have to name it `page.tsx`. Meaning every new route will be in a new folder in your app directory.

> Be careful !! Whatever you name the folder in your app directory, the same route will be created.

So Next.js 13 has introduced naming conventions for the implementation of various things in routing which are explained as follows:

## 1\. pages and layout:

Every new route you will create will have a `page.tsx` file, this file will display the contents when you visit this route. Meaning let's say you have a folder named About in the app directory and in it, you have `page.tsx`. In this file suppose you have written `This is my about page`. Then when you visit `/about`, you will get the content.

Now, let's say in the About page you want to have different metadata and styling, suppose the max-width should be only 900px, then you can create a `layout.tsx` page where-in you can mention the styles and metadata and it will app automatically to the `page.tsx`. Thus, the layout is given so that developers can create a good user experience without getting into too much complexity. I will show you the implementation as well

### 2\. loading:

It's a great user experience to have a loading spinner when your data is getting fetched and loading. Earlier in React, you might have to create a `useState` for loading but in Next.js, you can just create a file named `loading.tsx` in your `about` folder and declare what you want to show in that loading state and that's it.

## 3\. not-found:

The `not-found.tsx` file can be used to create a custom 404 page so that if the user enters an invalid URL, you can display some custom text to increase the user experience.

## 4\. middleware:

Use the file `middleware.ts` (or `.js`) in the root of your project to define Middleware. For example, at the same level as `pages` or the `app`, or inside `src` if applicable. See it's that easy to create a middleware in Next.js 13 !!!

## 5\. Route Groups:

Let's say you have a large project, where you have so many routes like for backend, for about, for blog etc. Then creating so many folders will get confusing and hence to improve the developer experience, Next.js 13 has created a convention called `Route Groups`.

![image](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-organisation.png&w=3840&q=75&dpl=dpl_q5J8wyTB41rGyZFxx4GhWSoYx9q5)

I have taken this from the official documentation of Next.js and here you can see if you have so many folders representing unique routes then you can group the similar routes in one folder for your clarity as done in the `marketing` case where-in you have `about` and `blog` directories representing the two routes.

But this is all theory until it's done practically, hence below I will show you the practical implementation of all these concepts in the project:

## Practical demonstration:

So for this demo, I have created a `test` project which is a new Next.js project. You can see the previous blog on how to create a new Next.js application as well. And in this project, I will create a grouped route named about me and in it, I will create a about route and then I will be declaring various routes such as page, layout error etc. Codes of all the files and output are below:

`page.tsx`

```tsx
import React from "react";

type Props = {};

const About = (props: Props) => {

  return (

    <div className="text-center">

      <p className="text-6xl">This is my about page</p>

      <p>

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure excepturi

        nemo quia eveniet nesciunt pariatur sequi ipsum mollitia voluptatum, eum

        id magnam, libero, cupiditate soluta architecto quidem possimus quas

        nisi modi quos ab repellat! Corrupti dolore tenetur ab iste vel ipsum

        aliquam odit totam ducimus alias possimus illo, commodi natus.

      </p>

      <p>

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi

        adipisci dolor dignissimos sunt voluptatem totam enim libero ipsum

        veniam ad laborum fugiat ex beatae nisi impedit vel perspiciatis cumque

        quam quod cupiditate, distinctio animi? Soluta fuga itaque voluptatibus

        quasi, illo unde, consequuntur labore dolorum similique vero ipsam

        sapiente ad quidem!

      </p>

    </div>

  );

};

export default About;
```

`loading.tsx`

```tsx
import React from "react";

type Props = {};

const Loading = (props: Props) => {

  return <div>Loading...</div>;

};

export default Loading;
```

`layout.tsx`

```tsx
import React from "react";

export const metadata = {

  title: "About Page",

  description: "This is my about page",

};

export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body className="max-w-[800px] mx-auto">{children}</body>

    </html>

  );

}
```

`error.tsx`

```tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({

  error,

  reset,

}: {

  error: Error;

  reset: () => void;

}) {

  useEffect(() => {

    // Log the error to an error reporting service

    console.error(error);

  }, [error]);

  return (

    <div>

      <h2>Something went wrong!</h2>

      <button

        onClick={

          // Attempt to recover by trying to re-render the segment

          () => reset()

        }

      >

        Try again

      </button>

    </div>

  );

}
```

`not-found.tsx`

```tsx
import React from "react";

type Props = {};

const NotFound = (props: Props) => {

  return (

    <div>

      <p>Requested page is not found please ensure its a valid url </p>

    </div>

  );

};

export default NotFound;
```

## Output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688147495027/3a694ef1-f284-4fcf-970d-846304abb112.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688147529848/f0add10c-1fa1-43ac-b960-5b9d21b200c9.png)

The max-width here is transferred by the `layout.tsx` file to the content of `page.tsx` file.
