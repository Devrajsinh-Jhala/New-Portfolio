---
title: "Next.js Routing, Data Fetching, Dynamic Routes and Metadata"
date: 2023-07-04
topic: next.js
summary: "In this article we will be exploring the various routing types, data fetching and how to set the metadata of your application."
original: https://devraj-jhala.hashnode.dev/nextjs-routing-data-fetching-dynamic-routes-and-metadata
---

Hello everyone and welcome to this blog on Next.js 13. Today we will be talking about Routing, Data Fetching and Setting up metadata in Next.js 13. So let's jump straight into routing first.

## Routing in Next.js 13:

You can visualize the routing in Next.js as a tree where the root is the app router and folders under it (routes) can be the leaf nodes or sub-trees. This can be visualized via a picture from [Next.js official documentation](https://nextjs.org/docs/app/building-your-application/routing).

![Image](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-component-tree.png&w=3840&q=75&dpl=dpl_7ug3f3KXfdmNWeR8fzcKg9ZVXUB5)

As you can see the root folder is your `app` directory and from that you have one route for blog and one entire other tree like structure (subtree) for dashboard.

### Nested Routes:

You can also create Nested Routes:- [Nested Routes](https://nextjs.org/docs/getting-started/project-structure#nested-routes) are routes like [`www.domain.com/blog/next.js-is-awesome`](http://www.domain.com/blog/next.js-is-awesome). To create such nested routes we will just follow the convention above as follows:

-   Creating a folder named blog in your app directory that will point to `/blog` and then creating a dynamic route in the blog directory by creating folder according to the convention (we will be exploring this sooner). What it will do is, it will catch all the routes coming from let's say database and will present it in the `/blog/name-of-the-blog`.

-   So here if we look at the route according to the tree figure above:

    -   `/` : Root

    -   `blog`: Segment

    -   `/next.js-is-awesome`: Leaf

### Dynamic Routes:

So far we have seen static and nested routes but now let's deep dive into dynamic routes. You might have seen dynamic routes in blogs, ecommerce stores etc. where-in if you notice when you let's say on a blog website, click on a new blog, then only the URL and its content changes. Rest of the part, let's say styling remains same. These routes are <mark>Dynamic Routes,</mark> where only the content changes and that is mainly fetched from the database.

In Next.js 13 we have convention for creating dynamic routes in Next.js by wrapping folder name with `[]` brackets. For example, `[slug]`, `[product]`. Such dynamic segments can be passed as params or parameters to the `page.tsx`, `layout.tsx` etc. which can be showed in the following example below:

#### Example:

Let's say for an ecommerce platform there could be a route as `app/product/[slug]/page.tsx` where the `[slug]` is the dynamic route segment for product and its details.

```ts

export default function Page({ params }: { params: { slug: string } }) { return <div>My Product: {params.slug}</div>}
```

Here the `params: slug` will return the leaf node of the URL which is as follows:

`app/blog/[slug]/page.js` `/blog/a` `{ slug: 'a' }` `app/blog/[slug]/page.js` `/blog/b` `{ slug: 'b' }`

### Catch-all Segments:

Catch-all segments as the name suggests will catch all the subsequent segments as well. For example `product/watch`, `product/watch/smart-watch`, `product/watch/fitness-band/<brand-name>` and so on.

These can be initialized by adding `...` in the dynamic folders. For example `[...slug]/page.tsx`. Hence `app/product/watch/[...slug]/page.tsx` will catch all the routes `product/watch`, `product/watch/smart-watch`, `product/watch/fitness-band/<brand-name>` etc.

`app/product/watch/[...slug]/page.js` `/product/watch/a` `{ slug: ['a'] }` `app/product/watch/[...slug]/page.js` `/product/watch/a/b` `{ slug: ['a', 'b'] }`

---

## Data Fetching:

The data fetching in Next.js 13 introduces a novel and simplified data fetching system built on React and the Web platform. Let's study the fetch() API first:

### fetch() API:

The new [<mark>fetch() API</mark>](https://nextjs.org/docs/app/api-reference/functions/fetch) is built on top of React's fetch API with new features to enable `caching and revalidating` rules. In the new Next.js 13 you can directly fetch the data in the components itself and its example can be shown below:

Here you can use `async-await` to fetch data in Server Components

```ts
async function getData() {
  const res = await fetch('https://api.example.com/...')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return (
	  <main>
		  <p>{data.<property_name>}</p>
	  </main>
  )
}
```

#### Static Data Fetching:

By default, the fetch() API is in the static data mode and will cache data indefinitely.

```ts
fetch('https://...')
```

#### Revalidating Data:

Let's say you want to revalidate the static data after some time interval, you can use the revalidate parameter and set the time duration in seconds. In the below example, we will have the cached data revalidated after 10 seconds.

```ts
fetch('https://...', { next: { revalidate: 10 } })
```

#### Dynamic Data Fetching:

If you don't want to store the data and fetch fresh data on every fetch() request. The cache `no-store` will not store the cached data and will fetch the new data on every request.

```tsx
fetch('https://...', { cache: 'no-store' })
```

## Metadata:

Next.js 13 has a metadata API that can be used for SEO to define the metadata for your application like (`meta` and `link`) tags inside `head` in HTML file. There are 2 ways you can add metadata to your application:

1.  Config-based Metadata: Export a static metadata object or a dynamic generateMetadata function in a layout.tsx or page.tsx file.

2.  File-based Metadata: Add static or dynamically generated special files to route segments.

### Static Metadata:

To define static metadata, export a Metadata object from a layout.tsx or static page.tsx file. layout.tsx

```ts
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {

  title: 'Create Next App',

  description: 'Generated by create next app',

}

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body className={inter.className}>{children}</body>

    </html>

  )

}
```

```ts
export const metadata = {

  title: 'Create Next App',

  description: 'Generated by create next app',

}
```

Here the metadata object has title which will appear on the tab and description will be used for SEO as well.

### Dynamic Metadata:

Let's say you have blog posts, then when you click on a blog post, then the title of the page (browser tab) should also change as different blogs have different titles. For this we have dynamic metadata API function known as `generateMetadata` function to fetch metadata that requires dynamic values.

```ts
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Page({ params, searchParams }: Props) {}
```
