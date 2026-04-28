import { createElement, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return createElement(
    "div",
    null,
    // The second argument is props. If no props, an empty object or null is fine.
    createElement("h1", {}, "Hello Frontend Masters"),
    createElement("p", null, "this is ssr"),
    // Client-side interactivity on a server component.
    createElement(
      "button",
      { onClick: () => setCount(count + 1) },
      `Count: ${count}`,
    ),
  );
}

export default App;
