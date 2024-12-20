const { withNx } = require("@nx/rollup/with-nx");
const preserveDirectives = require("rollup-plugin-preserve-directives");
const terser = require("@rollup/plugin-terser");

module.exports = withNx(
  {
    main: "./src/client.ts",
    outputPath: "../../dist/packages/core",
    tsConfig: "./tsconfig.lib.json",
    compiler: "swc",
    format: ["esm"],
    assets: [{ input: ".", output: ".", glob: "README.md" }],
  },
  {
    input: {
      index: "./src/index.ts",
      client: "./src/index.client.ts",
      api: "./src/api.ts",
    },
    output: {
      preserveModules: true,
    },
    plugins: [preserveDirectives.default(), terser()],
  },
);
