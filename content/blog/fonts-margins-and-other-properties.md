---
title: "Fonts, Margins, and Other Properties"
date: 2022-12-13
topic: tailwind
summary: "In this blog, we will see various fonts properties, margin, padding etc."
original: https://devraj-jhala.hashnode.dev/fonts-margins-and-other-properties
---

Hello all, Thank you for tuning in, In today's blog, we will be learning about some important concepts and utility classes regarding fonts, margins, padding, and animations. This will be a short blog where I will just show you how the utility classes are applied for margin and padding etc.

This will be helpful for you as ahead in this series, we will also be making a short project which will use all these concepts. You can run this code in your text editor using the steps mentioned in the TailwindCSS Installation blog and see the difference yourselves though I will be attaching a screenshot below as well.

All these properties are self-explanatory and you can also learn more about them in the documentation, also if you are using Tailwind Intellisense as an extension, then you can read about the values, etc. in the editor itself.

```html
<!DOCTYPE html>

<html>

  <head>

    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="/dist/output.css" rel="stylesheet" />

  </head>

  <body>

    <div class="flex flex-col items-center justify-center">

      <div class="flex flex-col items-center space-y-4 justify-center">

        <h1 class="text-3xl font-bold">Font Properties</h1>

        <p class="text-xl font-semibold">Font Family</p>

        <p class="font-sans">This font is font-sans</p>

        <p class="font-mono">This font is font-mono</p>

      </div>

      <div class="flex flex-col items-center space-y-4 justify-center">

        <p class="text-3xl font-semibold mt-10">Font Size</p>

        <p class="text-xl">This text is 20px</p>

        <p class="text-lg">This text is 18px</p>

        <p class="text-base">This text is 16px</p>

        <p class="text-sm">This text is 14px</p>

        <p class="text-xs">This text is 12px</p>

      </div>

      <div class="flex flex-col items-center justify-center">

        <p class="mt-10 text-3xl font-semibold">Padding</p>

        <p class="p-1">Padding 4px</p>

        <p class="p-2">Padding 8px</p>

        <p class="p-3">Padding 12px</p>

      </div>

    </div>

  </body>

</html>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1670697386044/qTF4GjXh4.PNG)
