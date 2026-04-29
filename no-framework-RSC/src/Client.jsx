import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";
import "doodle.css/doodle.css";

console.log("fetching flight response");
// Browser asks the server for the React Server Components output. The response from /react-flight is not normal HTML.
// It is a special serialized React payload often called the Flight response.
const fetchPromise = fetch("/react-flight");
const root = createRoot(document.getElementById("root"));
// createFromFetch allows us to turn a fetch request to an API endpoint, into a
// React component directly. Your framework will always do this for you.
// You make a request to an API endpoint, get a promise, and hand it to React to render. That's it!
// In other words, this takes the fetch response from /react-flight and turns it into something React can render.
const promise = createFromFetch(fetchPromise);
console.log("Rendering root: ", promise);
// Normally, with plain React, you might write: root.render(<App />);
root.render(promise);

// Browser loads index.html
// ↓
// index.html loads bundled Client.js
// ↓
// Client.js runs in the browser
// ↓
// Client.js fetches /react-flight
// ↓
// Server receives /react-flight request
// ↓
// Server renders App / Server Components
// ↓
// Server reads notes.db inside ServerComponent
// ↓
// Server creates the React Flight response
// ↓
// Browser receives Flight response
// ↓
// createFromFetch turns it into something React can render
// ↓
// root.render(...) displays the UI
