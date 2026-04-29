const path = require("node:path");
const { readFileSync } = require("node:fs");
const Fastify = require("fastify");
const fastifyStaticPlugin = require("@fastify/static");
const React = require("react");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");
const AppImport = require("../src/App.jsx");

// Pretty standard Fastify app. We're serving two static folders, public which
// is our CSS but also could be images and some other stuff. It's stuff that doesn't
// need to be compiled and just served directly. dist is our compiled Webpack stuff.

const App = AppImport.default;

// Webpack builds your client-side code and outputs files like:
// “This client component lives in this bundled file.”
// “This export maps to this client module.”
// “This chunk needs to be loaded in the browser.”
// So the manifest is basically a table of contents for the client bundle.
const MANIFEST = readFileSync(
  path.resolve(__dirname, "../dist/react-client-manifest.json"),
  "utf-8",
);

// The module map is the JavaScript object version of that manifest.
const MODULE_MAP = JSON.parse(MANIFEST);
const PORT = process.env.PORT ? process.env.PORT : 3000;

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

// Serve files from ../dist whenever the URL starts with /assets/.
fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, "../dist"),
  prefix: "/assets",
});

// Also serve files from ../public.
fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, "../public"),
  decorateReply: false,
});

fastify.get("/", async function rootHandler(req, reply) {
  return reply.sendFile("index.html");
});

fastify.get("/react-flight", function reactFlightHandler(req, reply) {
  try {
    reply.header("Content-Type", "application/octet-stream");
    const { pipe } = renderToPipeableStream(
      React.createElement(App),
      MODULE_MAP,
    );
    pipe(reply.raw);
  } catch (err) {
    request.log.error("react-flight err", err);
    throw err;
  }
});

module.exports = async function start() {
  try {
    await fastify.listen({ port: PORT });
  } catch {
    fastify.log.error(err);
    // Anything exit code that is not 0 is an error in Linux.
    process.exit(1);
  }
};
