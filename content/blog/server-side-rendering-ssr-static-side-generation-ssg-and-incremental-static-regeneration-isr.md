---
title: "Server Side Rendering (SSR), Static Side Generation (SSG) and Incremental Static Regeneration (ISR)"
date: 2023-07-05
topic: next.js
summary: "In this article, we will learn about some data fetching strategies like SSR, SSG and ISR"
original: https://devraj-jhala.hashnode.dev/server-side-rendering-ssr-static-side-generation-ssg-and-incremental-static-regeneration-isr
---

Hello everyone, welcome to this blog where we will be discussing what are these terms and also I will be showing you with code, how to implement them as well. These fetching strategies are not visible during development, you have to use `npm/yarn run build` to build the pages and then you can view in which strategy the data is fetched. I will also discuss the code and strategies as well.

## Server Side Rendering (SSR):

Server-side rendering (SSR) is a technique where the HTML for a web page is generated on the server and sent to the client in its entirety. This means that the client does not have to render the page itself, which can improve performance and SEO.

In Next.js 13, SSR is enabled by default for all pages. This means that you don't need to do anything special to use SSR in your Next.js application. However, you can still use `fetch("URL", { cache: "no-store", })`

```tsx
import React from "react";

type Props = {};

async function Server(props: Props) {

  // Server Side Rendering

  // This request should be refetched on every request. {cache: 'no-store'} will not store the cache

  const serverSideData = await fetch(

    "https://jsonplaceholder.typicode.com/posts",

    {

      cache: "no-store",

    }

  );

  const data = await serverSideData.json();

  return (

    <>

      <div>Server Side Rendering</div>

      <div>

        {data.map((data: any) => (

          <div key={data.id}>

            <p>{data.id}</p>

            <p className="text-green-500">{data.title}</p>

            <p>{data.body}</p>

          </div>

        ))}

      </div>

    </>

  );

}

export default Server;
```

## Static Side Generation (SSG):

Static site generation (SSG) is a technique where the HTML for a web page is generated at build time and served as static pages. This means that the page does not need to be rendered on the server every time it is requested, which can improve performance and SEO.

In Next.js 13, SSG is supported for pages that do not require any dynamic data. To use SSG you can use `force-cache` which will store the data as a cache and will not be rendered on the server every time.

Once the page has been generated, it is served as a static page by Next.js. This means that the page does not need to be rendered on the server every time it is requested, which can improve performance and SEO.

```ts
export default async function Home() {

  // Static Side Generation

  // By default cache: 'force-cache' is there

  const staticData = await fetch("https://jsonplaceholder.typicode.com/posts", {

    cache: "force-cache",

  });

  const data = await staticData.json();

  return (

    <main>

      <div>

        <p>Static Side Generation</p>

        <div>

          {data.map((data: any) => (

            <div key={data.id}>

              <p>{data.id}</p>

              <p className="text-green-500">{data.title}</p>

              <p>{data.body}</p>

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688149135991/4746d7f8-f93a-4573-a4dd-d4feb6d93b50.png)

Here the symbol of lambda (Server) represents the Server Side Rendering and the hollow circle (Static) represents Static Side Generation. You will get such data when you run the `npm run build` command in your terminal or when you deploy on the web, you will get such data as well in your deployment logs.

## Incremental Static Regeneration (ISR):

Incremental static regeneration (ISR) is a technique that allows you to generate static pages for your Next.js application without having to redeploy your entire site. This can be useful for pages that are updated frequently, such as a blog post archive or a product catalogue.

With ISR, Next.js will only regenerate the static pages that have changed since the last deployment. This means that you can update your pages without having to wait for a full site rebuild, which can improve performance and reduce downtime.

To use ISR, you can set the `{next: {revalidate: 10}}` which will revalidate the static data after every 10 seconds. Here in this example, I have a dynamic blog page where I am displaying content from SanityCMS. Here I am having `export const revalidate = 86400.` which will trigger the Incremental Static Regeneration.

```ts
import React from "react";

import { groq } from "next-sanity";

import Image from "next/image";

import urlFor, { sanityClient } from "../../../../sanity";

import { PortableText } from "@portabletext/react";

import { RichTextComponents } from "@/components/RichTextComponents";

import FormComponent from "@/components/FormComponent";

type Props = {

  params: {

    slug: string;

  };

};

// revalidate after one day

export const revalidate = 86400;

// In development mode, please uncomment the following line else it will throw an error

// export const dynamic = "force-static";

export async function generateStaticParams() {

  const query = groq`*[_type == 'post']{

    slug

}`;

  const slugs: Post[] = await sanityClient.fetch(query);

  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({

    slug,

  }));

}

async function Post({ params: { slug } }: Props) {

  const query = groq`

   *[_type<mark>"post" && slug.current </mark> $slug][0]{

    "comments": *[

  _type <mark> "comment" && post._ref </mark> ^._id && approved == true

],

author->{

name,

  image,

  bio

},

        categories[]->{

          title,

        },

title,

description,

slug,

mainImage,

body,

_id,

_createdAt,

_rev,

_type,

_updatedAt

    }

  `;

  const post: Post = await sanityClient.fetch(query, { slug });

  return (

    <>

      <article className="px-10 max-w-[1000px] mt-10 mx-auto w-full pb-28">

        <section className="space-y-2 border border-secondary rounded-lg text-white">

          <div className="relative z-[-10] min-h-56 flex flex-col md:flex-row justify-between">

            <div className="absolute z-[-10] top-0 w-full h-full opacity-10 blur-sm p-10">

              <Image

                className="object-cover object-center mx-auto"

                src={urlFor(post.mainImage).url()}

                alt={post.title}

                fill

              />

            </div>

            <section className="p-5  bg-secondary w-full">

              <div className="flex flex-col md:flex-row justify-between gap-y-5">

                <div className="space-y-2">

                  <h1 className="text-4xl font-bold">{post.title}</h1>

                  <p>

                    {new Date(post._createdAt).toLocaleDateString("en-US", {

                      day: "numeric",

                      month: "long",

                      year: "numeric",

                    })}

                  </p>

                </div>

                <div className="flex items-center space-x-2">

                  {post.author.image && (

                    <Image

                      className="rounded-full"

                      src={urlFor(post.author.image).url()}

                      alt={post.author.name}

                      height={40}

                      width={40}

                    />

                  )}

                  <div className="w-64">

                    <h3 className="text-lg font-bold">{post.author.name}</h3>

                    {/* Author Bio */}

                    <PortableText

                      value={post.author.bio}

                      components={RichTextComponents}

                    />

                  </div>

                </div>

              </div>

              <div>

                <div className="flex items-center justify-end mt-auto space-x-2">

                  {post.categories.map((category, i) => (

                    <p

                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"

                      key={i}

                    >

                      {category.title}

                    </p>

                  ))}

                </div>

                <p className="text-white ">{post.description}</p>

              </div>

            </section>

          </div>

        </section>

        <article className="my-10">

          <PortableText value={post.body} components={RichTextComponents} />

        </article>

        <hr className="border-secondary border" />

        <div className="my-5">

          <FormComponent post={post} />

        </div>

        {/* Comments */}

        <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">

          <h3 className="text-4xl">Comments:</h3>

          <hr className="pb-2" />

          {post.comments &&

            post.comments.map((comment, i) => (

              <p key={i}>

                <span className="text-yellow-500">{comment.name}: </span>{" "}

                {comment.comment}

              </p>

            ))}

          {post.comments.length == 0 && (

            <p className="text-lg text-[#f7ab07] font-bold">

              Be the first one to comment!

            </p>

          )}

        </div>

      </article>

    </>

  );

}

export default Post;
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688149107105/6df25e0d-2dbb-4a94-b9a7-06c5879a6caa.png)

Here I am sharing a picture of `npm run build` and you have an SSG page of the `/post/[slug]` where if I change the content of any blog in the database, the updated content will be shown on my deployed URL within 24 hours.
