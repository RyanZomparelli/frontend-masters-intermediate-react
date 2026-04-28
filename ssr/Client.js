// This is code that will only execute in the browser. If you have Google Analytics
// or local storage or anything like that, you'd do those sorts of things that
// need to happen in the browser but don't need to be run in Node.js. Specifically,
// hydrateRoot will only run on the browser and can't run on the server.

import { hydrateRoot } from "react-dom/client";
import { createElement } from "react";
import App from "./App.js";

// Vs createRoot..
hydrateRoot(document.getElementById("root"), createElement(App));
