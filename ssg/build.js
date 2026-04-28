// Render static HTML with a React component in Node.
// React server renderer: turns a React element tree into static HTML text.
import { renderToStaticMarkup } from "react-dom/server";
// Create React elements for the React component tree.
// React's low-level element creator, used here instead of JSX.
import { createElement } from "react";
// Node file system module. The Sync part means synchronous.
// Node's file system tools. The "Sync" versions run one step at a time,
// which keeps this build script simple and top-to-bottom.
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
// To define the __dirname and __filename in ES modules since these are not included
// in ES modules. Because we used "type": "module" in package.json.
// Converts an ES module's file:// URL into a normal filesystem path.
// We use this to recreate CommonJS-style __filename.
import { fileURLToPath } from "node:url";
// Path for the static .join() method to connect to the dist build, dirname to get the path to this file.
// Node's path utilities. path.join() safely builds file paths,
// and dirname() gets the folder path from a full file path.
import path, { dirname } from "node:path";
// Our React component, which will be rendered into static HTML.
import App from "./App.js";

// In older Node CommonJS files, Node automatically gives you variables like:
// __filename = the full path to this file
// __dirname = the folder this file lives in
// In ES modules, those variables are not created for us.
// Instead, Node gives us import.meta.url, which is like a "file:// path/to/file"
// pointing to the current module.
// fileURLToPath() converts the ES module file URL into a normal filesystem path.
// Then dirname() trims off the filename, leaving only the containing folder.
// Example:
// import.meta.url -> file:///Users/ryan/project/build.js
// __filename      -> /Users/ryan/project/build.js
// __dirname       -> /Users/ryan/project

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = path.join(__dirname, "dist");

const shell = readFileSync(path.join(__dirname, "index.html"), "utf8");

const app = renderToStaticMarkup(createElement(App));

const html = shell.replace("<!-- Root -->", app);

// Create dist folder if it doesn't exist
if (!existsSync(distPath)) {
  mkdirSync(distPath);
} else {
  // Delete all files in dist folder if it exists
  const files = readdirSync(distPath);
  for (const file of files) {
    unlinkSync(path.join(distPath, file));
  }
}

writeFileSync(path.join(distPath, "index.html"), html);
