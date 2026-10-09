---
title: "A quick guide to Server-Side Rendering"
date: 2022-05-26
topic: next.js
original: https://devraj-jhala.hashnode.dev/a-quick-guide-to-server-side-rendering
---

## What is Server-Side Rendering (SSR)?

-   It is a phenomenon where the web page is prebuilt by the Server instead of building it when the client visits the page.

---

## Why do we need SSR?

-   The main advantage is that because the web page is prebuilt on the server, the time taken to load the website reduces drastically.

> Average User spends just 3-5 seconds on a particular page

-   Hence we need to make sure that as soon as the client opens the page, he/she must see some content already loaded.

-   It also increases SEO performance as when the Google web crawlers come, they can see the entire page otherwise they will have to wait which drops the SEO score.

---

## How to implement SSR in Next.js?

-   We can make an async-await function getServerSideProps which returns the pre-rendered data in the form of props as the name suggests.

-   Then we can use this data in components by passing props to that component.

---

## Example

```js
export async function getServerSideProps() {
     const result = await fetch("https://...api_data");
     const data = await result.json();

     return{
          props: {
             data,  // data: data can also be written as only data
                       // Here in the object data is stored as key-value pairs
         }
    }

}

export default function App({ data }){
 // Some Code
}
```
