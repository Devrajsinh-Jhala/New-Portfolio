---
title: "Become a pro committer with husky and commitlint"
date: 2024-03-20
topic: practice
summary: "Hello everyone, welcome to the new blog where we will be discussing about how you can upgrade your commits, your changes and your codebase"
original: https://devraj-jhala.hashnode.dev/become-a-pro-committer-with-husky-and-commitlint
---

Hello everyone, welcome to the new blog where we will be discussing about how you can upgrade your commits, your changes and your codebase to achieve proper documentation and code structure. In this blog, we will learn about husky and commitlint, and how you can utilize these 2 packages to make sure your code follows a professional standard automatically after you commit your code and a change log is also generated. I will show you the entire demonstration using create-react-app but you can apply the concepts anywhere as long as you understand them. Now that the intensions are set, let us first understand in brief what all the stack we will be using and why?

## Theory:

### Conventional Commit:

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with [SemVer](http://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

---

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Husky:

Automatically **lint your commit messages**, **code**, and **run tests** upon committing or pushing.

### Lint Staged:

Linting makes more sense when run before committing your code. By doing so you can ensure no errors go into the repository and enforce code style. But running a lint process on a whole project is slow, and linting results can be irrelevant. Ultimately you only want to lint files that will be committed.

## Let's do the practical demonstration:

#### 1\. Will start by creating a new react app. I am using `create-react-app` only

`shell npx create-react-app good-demo`

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1710852780415/59a3de8b-00be-4a31-ac78-0a362d477bbe.png)

Now that react app is set, let's install the dependencies like *husky, commitlintrc, prettier, lint-staged* and also set the configs.

#### 2\. Setting up Husky

```shell
npm install -D husky
```

```shell
npx husky init
```

Now that you execute these 2 commands in your terminal, you will see `.husky` directory having `pre-commit` file having just `npm test only`. Don't worry, we will set it up.

#### 3\. Installing commitlintrc, lint staged, prettier

```shell
npm install --save-dev @commitlint/config-conventional @commitlint/cli prettier lint-staged standard-version
```

#### 4\. Now let's set up Prettier and Prettier ignore

1\. Create a file named .prettierrc having just empty object {} 2. Create a file named .prettierignore having contents

```
# Ignore artifacts:

build

coverage
```

#### 5\. Create commitlint.config.js and .lintstagedrc

-   .commitlint.config.js

```js
module.exports = {

  extends: ["@commitlint/config-conventional"],

};
```

-   .linstagedrc

```
{

    "*.{js,ts,jsx,tsx}": [

        "prettier --write",

        "eslint --fix",

        "eslint"

    ],

    "*.json": [

        "prettier --write"

    ]

}
```

Now 90% things are done, we just have to configure the husky for the commit lint rc as well.

#### Setting up files in husky directory

1.  pre-commit

```
#!/usr/bin/env sh

. "$(dirname "$0")/_/husky.sh"

npx lint-staged --concurrent false
```

2.  commit

```
#!/usr/bin/env sh

. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit
```

Now let me explain what this does. From now whenever you will commit, the husky will run and hence will enforce lint, prettier and commit rules. Let's see how it does

Your file structure after this should look like this

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1710852964911/a32e029b-b4ff-4ff0-aace-f23d3ba064bf.png)

Now I will re-initialize the git repository just to prevent any errors and make sure everything is in sync.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1710852995213/7dae736b-1a96-44d0-bfd3-1eba14b4afb5.png)

Now let me add all the changes and make a commit and see what happens

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1710853007662/d978ddea-45c4-4f04-9a04-bfaf2ad01aca.png)

Did you observe? Our eslint and prettier run perfectly but commitlint gave error. Why?? because our commit message is `Add lint` which violates the rules of commitlint message. You can learn more about rules from the documentation [here](https://commitlint.js.org/reference/rules.html). For now just remember short convention `type: message in lower case`. Let me add new message and see what happens. Also we can generate changelog as follows:

```shell
npx standard-version --first-release
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1710853018960/0c278ec8-6b3f-4a56-8e26-f68a1b7f315d.png)

File named [CHANGELOG.md](http://CHANGELOG.md) will be created after fetching details from the commit message you gave.

```markdown
# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2024-03-19)
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1710853030063/d0a07845-01d6-4fdf-92e8-25f42600d793.png)

As you can see the commit is successful and congratulations you have now enforced strict rules around your codebase which will make it more professional and more readable for future you and community as well.
