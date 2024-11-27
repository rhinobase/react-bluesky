import { GoogleAnalytics } from "@next/third-parties/google";
import type { PropsWithChildren } from "react";
import "bsky-react-post/theme.css";
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
    default: "bsky-react-post",
    template: "%s – bsky-react-post",
  },
  description: "Embed Bluesky posts in your React applications.",
  twitter: {
    card: "summary_large_image",
    site: "bsky-react-post.rhinobase.io",
    creator: "@rhinobaseio",
  },
  openGraph: {
    title: {
      default: "Bsky React Post",
      template: "%s – bsky-react-post",
    },
    description: "Embed Bluesky posts in your React applications.",
    type: "website",
    images: {
      url: "https://res.cloudinary.com/rhinobase/image/upload/f_auto,q_auto/v1/bsky-react-post/sm1syi7qzxaoamjpjrd9",
    },
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

// Google Analytics ID
const GMT_ID = "G-4R4ZW45190";

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="dark:bg-secondary-950 h-screen w-full bg-white selection:bg-[#79ffe1] dark:selection:bg-[#f81ce5] dark:selection:text-white antialiased">
        <Providers>{props.children}</Providers>
        <GoogleAnalytics gaId={GMT_ID} />
      </body>
    </html>
  );
}
