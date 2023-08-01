const path = require("path");
const esbuild = require("esbuild");

const ROOT_DIR = path.resolve(__dirname, "../", "../");
const SRC_PATH = path.resolve(ROOT_DIR, "example-app");

esbuild.build({
  entryPoints: [
    path.resolve(SRC_PATH, "minimal-index.tsx"),
    path.resolve(SRC_PATH, "index.tsx"),
  ],
  bundle: true,
  outdir: "./build",
  external: ["*.css"],
});
