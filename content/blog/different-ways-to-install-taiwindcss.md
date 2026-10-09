---
title: "Different Ways to Install TaiwindCSS"
date: 2022-12-12
topic: tailwind
summary: "In this blog, we will learn about different ways to install TailwindCSS in your HTML, React.js, and Next.js Project"
original: https://devraj-jhala.hashnode.dev/different-ways-to-install-taiwindcss
---

To initialize the TailwindCSS in your HTML project there are two ways which will be discussed below:

1.  Play CDN:

    *   Play CDN allows you to write TailwindCSS styles without installing anything! You just have to include this line: in the head tag of your HTML.

    *   You can also customize the TailwindCSS by writing the following code in the script tags:

```html
<script>
	tailwind.config = {
		theme: {
			extend: {
				colors: {
					clifford: '#da373d',
				}
			}
		}
	}
</script>
```

Don't worry if you find this code difficult to understand, we will look into customization in grave detail. I have taken this code from the official [TailwindCSS Documentation](https://tailwindcss.com/docs/installation/play-cdn). You can also refer to it for the same.

> Please note that TailwindCSS does not advise to use PlayCDN in production, this can be used for Development purpose only.

Now let's look into the method we can use for TailwindCSS in production as well as development.

2.  Using Tailwind CLI:

    *   To use this, you must have [Node.js](https://nodejs.org/en/) installed in your system. You can install it from the Node.js Website.

    *   Now that you have Node.js installed you can follow the following steps:

3.  Make a folder for your TailwindCSS project

    *   Make a folder name src and create 2 files:

        *   index.html

        *   style.css

4.  Open the terminal in your folder location and type `npm init -y`. This will initialize a Node.js project without much information

5.  Then type the following commands:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

These commands are taken from the official documentation only, So now let's understand what each command is doing.

The first command installs tailwindcss as a dev dependency (-D indicates dev dependency). The second command initializes a tailwindcss project in your directory.

Now configure your tailwind paths in the tailwind.config.js via the below code (Clear the file and paste the below code):

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Now add the following code to your style.css file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now in your terminal, run the following command:

```bash
npx tailwindcss -i ./src/style.css -o ./dist/output.css --watch
```

This command watches the changes in your HTML file and builds it accordingly

4.  Now in your HTML file add the `link` tag mentioned below

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/output.css" rel="stylesheet">
</head>
<body>
  <!-- Some HTML Code -->
</body>
</html>
```

Now every time you make changes to the HTML, the website will build accordingly

If you are using VSCode or any editor, then you can install the following extensions:

1.  Live Server

2.  Tailwind Intellisense

Live Server creates a server for your HTML file and rebuilds it every time you make some changes to it. Tailwind Intellisense gives you suggestions for tailwind utility classes so you don't have to remember the classes

Now that we have looked at the installation for HTML, let's look at the installation for React.js and Next.js projects as well

## React.js

You can type the following commands in your shell to install tailwindcss in your React.js project

```bash
npx create-react-app tailwind-tutorial
cd tailwind-tutorial
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

After creating the project you can go to tailwind.config.js and modify the `content:` line as follows

Configure tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Next.js

Simply run this command in your terminal and all the things will get done for you!

```bash
npx create-next-app -e with-tailwindcss my-project
```
