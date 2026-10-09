---
title: "Web Caching explained in an easy way"
date: 2023-07-05
topic: web
summary: "In this blog, we will discuss what is Caching, types of Caching, Challenges with web caching and some strategies to combat them."
original: https://devraj-jhala.hashnode.dev/web-caching-explained-in-an-easy-way
---

Hello everyone, welcome to this blog where I will be explaining what is caching especially in the web domain and how it helps improve user experience. You might have heard about caching, Content Delivery Networks a lot these days and it's relevant as well. In this era of high-quality graphics, 3-D illustrations on the web etc. Caching plays an important role in ensuring that these assets don't become a bottleneck in the overall performance of the website.

![Image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCR_qsSFcBBI2KKa78us2DvfdwKnM-jiO6rQ&usqp=CAU)

## What is Caching:

Let's look at the definition of caching first and then I will simplify it for you.

> Caching refers to the practice of storing and serving web content in a cache to improve the performance and efficiency of web applications. Caching is employed at various levels in the web stack, including the client-side, server-side, and network infrastructure. It aims to minimize the time and resources required to generate and transmit web content.

If you carefully observe, this says the same thing we discussed in the starting section. Overall, in a general sense, we can conclude that Caching tends to store repetitive elements or static assets such that they can be delivered quickly the next time when the resource is requested.

## Types of Web Caching:

Now that we are clear on what exactly caching is, let's look at some of the types of Web Caching that are mainly used over the Internet:

1.  Client-Side Caching: Web browsers can cache static resources, such as HTML files, CSS stylesheets, JavaScript files, images, and other media files. When a user visits a website, the browser checks its cache to see if it already has a local copy of the requested resource. If it does, the browser can retrieve the resource from the cache instead of downloading it again from the server. This reduces network latency and improves page load times for subsequent visits.

2.  Server-Side Caching: Web servers can implement caching mechanisms to store generated content or database query results. For example, a dynamic web page that requires server-side processing can be generated once and then cached. When subsequent requests are made for the same page, the server can serve the cached version instead of regenerating it from scratch. This reduces the computational load on the server and improves response times.

3.  Content Delivery Network (CDN) Caching: CDNs are distributed networks of servers located across various geographical locations. They cache static content from websites and serve it to users from the closest server location. CDNs improve performance by reducing the distance between the user and the server, minimizing network latency, and offloading traffic from the origin server.

4.  Database Query Caching: In web applications that rely on databases, caching can be employed to store the results of frequently executed database queries. By caching query results in memory, subsequent requests for the same data can be served quickly, avoiding the need to execute the query again. This reduces the load on the database server and improves response times.

## Some Challenges with Caching:

The main challenge with Caching is that let's say you have a blog website initially with 3 blogs. The Cache will now store the static assets of these 3 blogs. Now if you published a new blog how will the cache know to store the assets of 4th blog? This problem is known as Cache invalidation. When the original content changes, it's necessary to update or invalidate the cache to ensure users receive the most up-to-date version.

## Strategies to solve the challenges:

### Incremental Static Regeneration (ISR):

If you have some idea about Incremental Static Regeneration (ISR), then what ISR does is it revalidates the cache after a certain set amount of period. This is one of the primary solutions implemented these days to combat cache invalidation. Strategies such as cache busting or versioning are also employed to address this issue.

### Cache Busting:

Cache busting is a technique used in web development to ensure that updated or modified versions of static resources, such as CSS stylesheets, JavaScript files, or images, are fetched by the browser instead of serving them from the cache. It is employed to overcome the issue of browsers caching older versions of files and serving them even after the files have been updated on the server. File Name Modification and File Content Hashing are some of the types of Cache Busting.

### Versioning:

Versioning refers to assigning a unique version identifier to a resource, such as a static file or an API endpoint, whenever it is modified or updated. The version identifier is typically a string or a number that changes whenever the resource is changed.

By incorporating versioning into the URLs or references of resources, cache invalidation becomes more manageable. When a resource is updated, the version identifier is changed, resulting in a new URL or reference for that resource. This, in turn, ensures that the updated version is treated as a separate entity by the browser cache or any intermediate caching servers, eliminating the need to manually clear or invalidate the cache.

## Conclusion:

I hope you learned something about Caching, its types and strategies. Thank you for reading the article and giving it your valuable time. If you have any doubts or feedback, feel free to comment below. I would love to hear them. Thank you once again and keep learning!
