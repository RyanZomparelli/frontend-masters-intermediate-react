// This bootstrap file is doing three big things:
// 1. Enable Node to understand JSX/React files through tooling.
// 2. Convert ES module imports/exports into CommonJS for server execution.
// 3. Register React Server Component behavior so server/client boundaries work.
// That’s also why this file is separate from the actual server file.
//  It needs to run before your app/server code gets imported.

const reactServerregister = require("react-server-dom-webpack/node-register");
reactServerregister();

const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
  plugins: ["@babel/transform-modules-commonjs"],
});

// Run server.js
require("./server")();

// We're doing CommonJS for our server portion. I had it working with ES modules
// but it took so much extra code that this was simpler to teach you. Feel free
// to convert it later yourself. Everything else in this course will be ES modules.
// This file does three things: it makes our Node.js server able to read React/JSX
// files, it makes it able to ES modules in our client code, and it makes it able to
// do RSCs via the webpack bundler by hooking into the module systems to render some
// portions and not others. Remember the --conditions react-server that we have in our
// CLI command? This is what that is for.
// Why is this in a separate file? It's so all subsequent require/import calls can
// be run through Babel and the react-server-dom-webpack modules.
