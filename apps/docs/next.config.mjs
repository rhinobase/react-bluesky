import nextMDX from "@next/mdx";
import { composePlugins, withNx } from "@nx/next";
import withSearch from "./mdx/search.mjs";
import { recmaPlugins } from "./mdx/recma.mjs";
import { rehypePlugins } from "./mdx/rehype.mjs";
import { remarkPlugins } from "./mdx/remark.mjs";
import pk from "../../package.json" assert { type: "json" };

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  experimental: {
    optimizePackageImports: ["@rafty/ui"],
  },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_VERSION: pk.version,
  },
};

const plugins = [withSearch, withMDX, withNx];

export default composePlugins(...plugins)(nextConfig);
