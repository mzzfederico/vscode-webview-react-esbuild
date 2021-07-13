#!/usr/bin/env node

// Disables code splitting into chunks
// See https://github.com/facebook/create-react-app/issues/5306#issuecomment-433425838

const cliArguments = process.argv;

let isWatching = cliArguments.includes("--watch");
let isExposingDevServer = cliArguments.includes("--expose");

const path = require("path");
const fsExtra = require('fs-extra');

/* Cleanup */
fsExtra.emptyDirSync(path.resolve("build"));

/* Compile */
const tsConfig = {
  main: path.resolve("scripts", "tsconfig.json"),
  extension: path.resolve("scripts", "tsconfig.extension.json")
};

const esbuild = require('esbuild');

/* Main build */
esbuild.build({
  entryPoints: [path.resolve("src", "index.tsx")],
  bundle: true,
  format: 'cjs',
  target: [
    'es2019',
  ],
  watch: isWatching,
  tsconfig: tsConfig.main,
  outfile: path.resolve("build", "main.js")
}).catch(() => process.exit(1));

/* Extension build */
esbuild.build({
  entryPoints: [path.resolve("ext-src", "extension.ts")],
  bundle: true,
  format: 'cjs',
  target: [
    'es2019',
  ],
  watch: isWatching,
  tsconfig: tsConfig.extension,
  outfile: path.resolve("build", "ext-src", "extension.js"),
  external: ["vscode", "path"]
}).catch(() => process.exit(1));

/* Web server */

if (isExposingDevServer) {
  const { startDevServer } = require("@web/dev-server");

  async function exposeServer() {
    const server = await startDevServer({
      config: {
        rootDir: path.resolve("build"),
        port: 8888,
        watch: true,
        appIndex: path.resolve("build", "index.html"),
      }
    });
  }

  function copyStaticFiles() {
    try {
      fsExtra.copySync(path.resolve("static"), path.resolve("build"))
    } catch (err) {
      console.error(err)
    }
  }

  copyStaticFiles();
  exposeServer();
}