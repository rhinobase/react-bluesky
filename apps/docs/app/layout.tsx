import type { PropsWithChildren } from "react";
import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bluesky React Post",
    template: "%s – bsky-react-post",
  },
  description: "Embed Bluesky posts in your React applications.",
  twitter: {
    card: "summary_large_image",
    site: "bsky-react-post.vercel.app",
    creator: "@rhinobaseio",
  },
  openGraph: {
    title: {
      default: "Bsky React Post",
      template: "%s – bsky-react-post",
    },
    description: "Embed Bluesky posts in your React applications.",
  },
  authors: {
    name: "Rhinobase Team",
    url: "https://github.com/rhinobase",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
  ],
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white dark:bg-secondary-950">
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
