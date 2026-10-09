---
title: "Directives and Customization in TailwindCSS"
date: 2022-12-14
topic: tailwind
summary: "In this blog, we will learn about various directives in TailwindCSS and Customization in TailwindCSS"
original: https://devraj-jhala.hashnode.dev/directives-and-customization-in-tailwindcss
---

Hello all, thank you for tuning in, Today we will be learning about layer and apply directives in TailwindCSS and also how we can customize everything in TailwindCSS. If you see the style.css file, we have 3 lines of code which are:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Well this `@tailwind` is also a directive like `@apply` and `@base`. If you look at the [documentation](https://tailwindcss.com/docs/functions-and-directives#directives), You will see that there are total 4 directives:

*   @tailwind

*   @apply

*   @layer

*   @config

Directives are custom Tailwind-specific [at-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) you can use in your CSS that offer special functionality for Tailwind CSS projects. at-rules are CSS statements beginning with `@` that instruct CSS how to behave.

@tailwind directive installs base, components, utilities, and variants styles in your CSS file

@apply directive is used to apply CSS to your custom class. For example, let's say on your website, you want to have a button for Call To Action and this button is occurring 5 times throughout the website. In this case, it's not a good idea to copy the same classes again and again! So the solution is to make a button class and add styles there and use this button class everywhere.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.button{
	@apply text-white bg-blue-500 px-4 py-2;
}
```

```html
<button class="button">Click Me</button>
<button class="button">Click Me</button>
<button class="button">Click Me</button>
```

This, as we can see, makes the code a lot cleaner and easier to read.

@layer directive is used to insert the code below the layers. For example, let's see the below code:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base{
	.button {
		@apply text-white bg-blue-500 px-4 py-2;
	}
}
```

This class button will be inserted after the base layer and you can verify it by going to the dev tools and style.css file in your browser.

@config is used to specify which config file should be used in compiling TailwindCSS. In our case, we just have one tailwind.config.js so we need not use this, but in large projects where we might have multiple such config files, there we need to mention them.

Now that we have looked at various directives, let's look at how we can customize things in TailwindCSS. So if you want to customize any utility classes, then you can use `square-bracket notation`. Let's look at some examples first:

```html
<div>
	<p class="text-[15px]">Font is 15px</p>
	<p class="text-[#EDEADE]">The color of this text is Alabaster which is a
    shade of white</p>
</div>
```

Like this for any class, be it margin, padding, background-color everything can be customized. But let's say, you want to have a custom background color and don't want to write the HEX Code everywhere then you can name the color in the config and use it everywhere. Let's see with an example:

```js
/** @type {import('tailwindcss').Config} */

module.exports = {

  content: ["./src/**/*.{html,js}"],

  theme: {

    extend: {

      colors: {

        alabaster: "#EDEADE",

      },

    },

  },

  plugins: [],

};
```

```html
<p class="font-alabaster">This is color Alabaster</p>
```

Notice that we wrote the custom class like we are writing other utility classes. Hence whatever customization you want to have, just mention it in the config file and use it everywhere or you can use square bracket notation also. You can even customize the utility classes of Tailwind to your values!!!
