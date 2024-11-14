const { withNx } = require("@nx/rollup/with-nx");
const terser = require("@rollup/plugin-terser");
const url = require("@rollup/plugin-url");
const svg = require("@svgr/rollup");

module.exports = withNx(
  {
    main: "./src/index.ts",
    outputPath: "../../dist/packages/core",
    tsConfig: "./tsconfig.lib.json",
    compiler: "swc",
    format: ["esm"],
    assets: [{ input: ".", output: ".", glob: "README.md" }],
  },
  {
    input: {
      index: "./src/index.ts",
      api: "./src/api.ts",
    },
    output: {
      entryFileNames: "[name].js",
    },
    plugins: [
      svg({
        svgo: false,
        titleProp: true,
        ref: true,
      }),
      url({
        limit: 10000, // 10kB
      }),
      terser(),
    ],
  },
);
