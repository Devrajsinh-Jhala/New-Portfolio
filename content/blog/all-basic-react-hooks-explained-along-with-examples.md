---
title: "All Basic React Hooks explained along with examples"
date: 2023-03-07
topic: react
original: https://devraj-jhala.hashnode.dev/all-basic-react-hooks-explained-along-with-examples
---

# useState Hook:

useState is a built-in hook in React that allows developers to manage state in functional components. Before the introduction of hooks, state management was only possible in class components, but with the useState hook, functional components can also have state.

The useState hook takes an initial value as an argument and returns a state variable and a function that can be used to update the state variable. The state variable is persistent across re-renders and can be used to render the component's UI based on the current state.

Here's an example of how useState is used:

```js
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

In the above example, we are using the useState hook to declare a state variable called 'count' with an initial value of 0. We then use 'setCount', which is a function returned by useState, to update the 'count' state variable when the button is clicked.

One important thing to note is that useState does not merge states like the setState method does in class components. Instead, it replaces the entire state object with the new state value. Therefore, when updating the state with useState, make sure to pass in the entire state object with the updated values, rather than just the changed values.

In summary, a useState hook is a powerful tool for managing state in functional components. It allows developers to write more concise and reusable code while still having access to stateful logic. By using useState, developers can create dynamic UIs that respond to user interactions and improve the overall user experience of their React applications.

---

# useEffect Hook:

Sure, useEffect is a built-in hook in React that allows developers to handle side effects in functional components. Side effects are any operations that do not directly affect the state of a component, such as fetching data from an API or manipulating the DOM.

The useEffect hook takes a function as its argument and runs it after every render of the component. This function can contain any code that has side effects, such as setting up event listeners or fetching data from an API.

Here's an example of how useEffect is used:

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

In the above example, we are using the useEffect hook to update the document title after every render of the component. The effect function sets the document title based on the current value of the 'count' state variable.

One important thing to note is that the useEffect hook can also be used to clean up after a component. This is done by returning a function from the effect function that contains the cleanup logic. This cleanup function is then called when the component unmounts or when the effect is re-run with new dependencies.

In summary, a useEffect hook is a powerful tool for handling side effects in functional components. It allows developers to write code that is not directly related to state management, such as fetching data or setting up event listeners. By using useEffect, developers can create more dynamic and responsive UIs and improve the overall user experience of their React applications.

---

# useContext Hook:

Sure, useContext is a built-in hook in React that allows developers to share data across the component tree without having to pass down props manually through every level of the tree.

With useContext, you can create a context object that contains data that you want to share between components. Then, you can use the useContext hook to access this data in any component within the context provider.

Here's an example of how useContext is used:

```js
import React, { useContext } from 'react';

const UserContext = React.createContext();

function App() {
  return (
    <UserContext.Provider value={{ name: 'John', age: 30 }}>
      <div>
        <h1>Welcome to my app!</h1>
        <User />
      </div>
    </UserContext.Provider>
  );
}

function User() {
  const user = useContext(UserContext);

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

In the above example, we are using the useContext hook to access the user data that was passed down from the App component through the UserContext provider. We define the UserContext object using the createContext method and pass it as a value to the UserContext.Provider component.

In the User component, we use the useContext hook to access the user data and render it in the component's UI.

One important thing to note is that the useContext hook can only be used within components that are descendants of the context provider component. If you try to use useContext outside of the context provider, it will not work.

In summary, a useContext hook is a powerful tool for sharing data between components without having to pass down props manually through every level of the component tree. It allows developers to write more concise and reusable code and improve the overall efficiency of their React applications.
