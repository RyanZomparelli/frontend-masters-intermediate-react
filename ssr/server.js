import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
// When you intend on hydrating use renderToString, otherwise use renderToStaticMarkup.
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import App from "./App.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const shell = readFileSync(path.join(__dirname, "dist", "index.html"), "utf-8");

// Setting up fastify server. fastify is a web server framework like express.js
const app = fastify();
app.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
});

// Used .replace() in our SSG example now we use .split()
const parts = shell.split("<!-- Root -->");

app.get("/", (req, reply) => {
  reply.raw.write(parts[0]);
  const reactApp = renderToString(createElement(App));
  reply.raw.write(reactApp);
  reply.raw.write(parts[1]);
  reply.raw.end();
});

app.listen({ port: 3000 });
