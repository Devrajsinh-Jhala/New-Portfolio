---
title: "HTTP/2 explained in an easy way"
date: 2023-07-08
topic: web
summary: "In this article, we will discuss what is HTTP? Why it is important, What is HTTP2, etc."
original: https://devraj-jhala.hashnode.dev/http2-explained-in-an-easy-way
---

Hello everyone, welcome to this blog where we will be discussing the Hyper Text Transfer Protocol (HTTP), what is it?, why it is important?, and what is HTTP2? what is the difference etc? So let's dive deep into this topic:

## What is HTTP?

The HTTP (Hypertext Transfer Protocol) is a protocol that governs the communication between web browsers (clients) and web servers. It is the foundation of the World Wide Web and enables the retrieval and transmission of resources, such as web pages, images, videos, and other types of content, over the Internet.

## How it is used?

In the web domain, the HTTP protocol is essential for communication between web browsers and web servers, enabling the retrieval and transmission of web resources. Here's how it is used in the web domain:

1.  Retrieving Web Pages: When a user enters a URL (Uniform Resource Locator) into a web browser or clicks on a link, the browser sends an HTTP request to the corresponding web server. The server responds with an HTTP response containing the requested web page, which is then rendered and displayed in the browser for the user to interact with.

2.  Handling HTTP Methods: HTTP defines different methods (also known as verbs) that clients can use to interact with servers. The most commonly used methods in the web domain are:

    -   GET: Retrieves a resource from the server. It is primarily used for retrieving web pages, images, or other static content.

    -   POST: Sends data to the server to create or update a resource. It is often used for submitting forms, sending user input, or performing actions that modify server-side data.

    -   PUT: Updates a resource on the server. It is typically used to replace an entire resource with the new data provided by the client.

    -   DELETE: Removes a resource from the server. It instructs the server to delete the specified resource.

    These HTTP methods allow web applications to perform a wide range of operations, such as submitting forms, uploading files, sending data, or deleting content.

3.  Handling HTTP Status Codes: HTTP responses include status codes to indicate the outcome of a request. These three-digit codes provide information about the success or failure of a request and allow clients and servers to handle various situations appropriately. Common status codes include:

    -   200 (OK): The request was successful, and the server is returning the requested content.

    -   404 (Not Found): The requested resource could not be found on the server.

    -   500 (Internal Server Error): An unexpected error occurred on the server while processing the request.

    -   302 (Found): The requested resource is temporarily moved to a different location, and the client should try a different URL.

    Web applications can use these status codes to handle different scenarios, redirect users, display error messages, or perform appropriate actions based on the server's response.

4.  Managing Cookies: HTTP supports the use of cookies, which are small pieces of data stored on the client's browser. Cookies are often used for session management, user authentication, and tracking user preferences or activities on websites. The server can send cookies in the response, and the client includes them in subsequent requests, allowing the server to maintain stateful interactions with the client.

## Why it is important?

-   HTTP (Hypertext Transfer Protocol) is essential for the functioning of the World Wide Web and plays a vital role in enabling communication between web browsers and servers. It allows users to access and retrieve web resources such as web pages, images, videos, and other content over the internet.

-   HTTP provides a standardized protocol that ensures consistency and interoperability across different web platforms, browsers, and servers. It follows a request-response model, allowing clients to send requests to servers and receive responses containing the requested resources or relevant information.

-   HTTP defines various request methods that enable clients to interact with servers and perform operations such as retrieving resources, submitting data, updating content, or deleting information.

-   The protocol's status codes help handle different scenarios, providing information about the success or failure of a request. HTTP is vital for secure transactions, user authentication, and protecting data privacy and integrity.

-   It continues to evolve with new versions and features, introducing improvements in performance, efficiency, and functionality. Overall, HTTP forms the backbone of web communication, facilitating seamless access to web resources, dynamic web experiences, and the development of web-based applications, services, and technologies.

> Without HTTP, the modern web experience as we know it would not be possible.

## What is HTTP2?

HTTP/2 (Hypertext Transfer Protocol version 2) is a major revision of the HTTP protocol, which is the foundation of communication between web browsers and servers. It was developed to address the limitations and performance bottlenecks of the earlier HTTP/1.1 protocol. HTTP/2 introduces several key enhancements that improve the efficiency, speed, and responsiveness of web applications.

Here are some key features and benefits of HTTP/2 in web development:

1.  Multiplexing: One of the most significant improvements in HTTP/2 is the introduction of multiplexing. In HTTP/1.1, browsers could typically only establish a limited number of concurrent connections to a server, resulting in a need for multiple requests to be queued and processed sequentially. With HTTP/2, multiple requests and responses can be sent and received simultaneously over a single TCP connection. This allows for more efficient utilization of network resources and reduces latency.

2.  Binary Protocol: HTTP/2 uses a binary framing layer instead of the text-based protocol of HTTP/1.1. This binary format is more compact and can be more efficiently parsed by servers and browsers. It also enables more efficient compression and reduces the amount of data transmitted over the network.

3.  Header Compression: In HTTP/1.1, headers are sent with each request and response, and these headers can be substantial in size, especially for complex web applications. HTTP/2 introduces header compression using the HPACK algorithm, which significantly reduces the overhead associated with headers. This improves network efficiency and reduces bandwidth consumption.

4.  Server Push: HTTP/2 introduces server push, a feature that allows the server to proactively send resources to the client before they are explicitly requested. This enables the server to anticipate the client's needs and send additional resources such as CSS, JavaScript, or images, thereby reducing the number of round trips needed to render a webpage.

5.  Stream Prioritization: HTTP/2 introduces stream prioritization, allowing developers to assign priority levels to different resources. This enables more control over the order in which resources are transmitted and processed by the client, ensuring that critical resources are prioritized and loaded faster, improving page rendering times.

6.  Connection Multiplexing: HTTP/2 supports a single, long-lived connection between the client and server, rather than opening a new connection for each request and response as in HTTP/1.1. This eliminates the need for connection setup and teardown overhead, reducing latency and improving efficiency.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688807498180/02841e34-8a79-400c-b3ab-25b86860a56b.png)

## Difference between HTTP and HTTP2:

HTTP (Hypertext Transfer Protocol) and HTTP/2 are two different versions of the same protocol that governs communication between web browsers and servers. While they share some similarities, they also have significant differences in terms of performance, efficiency, and features. Here are the key differences between HTTP and HTTP/2:

1.  Multiplexing: One of the most significant differences is that HTTP/2 introduces multiplexing, which allows multiple requests and responses to be sent and received simultaneously over a single TCP connection. In contrast, HTTP/1.1 typically relies on establishing multiple connections to achieve concurrent communication, which can be less efficient.

2.  Binary Protocol: HTTP/2 uses a binary framing layer for communication, whereas HTTP/1.1 uses a text-based protocol. The binary format of HTTP/2 is more compact, reducing overhead and improving parsing efficiency for both clients and servers.

3.  Header Compression: In HTTP/1.1, headers are sent with each request and response and can be substantial in size, leading to increased network overhead. HTTP/2 introduces header compression using the HPACK algorithm, which significantly reduces the size of headers, improving network efficiency.

4.  Server Push: HTTP/2 introduces the concept of server push, which allows the server to proactively send additional resources to the client without waiting for explicit requests. This can improve performance by reducing the need for subsequent round trips to fetch related resources.

5.  Stream Prioritization: HTTP/2 includes stream prioritization, allowing developers to assign priority levels to different resources. This enables more control over the order in which resources are transmitted and processed by the client, optimizing the loading of critical resources.

6.  Backward Compatibility: HTTP/2 is backward-compatible with HTTP/1.1, meaning that if a client or server does not support HTTP/2, the communication can fall back to using HTTP/1.1. This ensures that existing web infrastructure remains functional even if HTTP/2 is not fully supported.

7.  Security Considerations: While security is not inherently tied to either HTTP or HTTP/2, HTTPS (HTTP Secure) is often used to encrypt the communication between clients and servers in both protocols. Both HTTP and HTTP/2 can be used with or without encryption, but using HTTPS is recommended to protect data privacy and integrity.
