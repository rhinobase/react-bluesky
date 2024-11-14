import type { PostHandleProps } from "bsky-react-post";
import { fetchPost } from "bsky-react-post/api";
import cors from "edge-cors";
import { type NextRequest, NextResponse } from "next/server";

export const fetchCache = "only-cache";

export async function GET(req: NextRequest) {
  try {
    let config: PostHandleProps;

    if (req.nextUrl.searchParams.has("handle")) {
      config = {
        handle: req.nextUrl.searchParams.get("handle") as string,
        id: req.nextUrl.searchParams.get("id") as string,
      };
    } else if (req.nextUrl.searchParams.has("did")) {
      config = {
        did: req.nextUrl.searchParams.get("did") as string,
        id: req.nextUrl.searchParams.get("id") as string,
      };
    } else {
      throw new Error("Invalid Bluesky Embed Config");
    }

    const post = await fetchPost(config);

    return cors(
      req,
      NextResponse.json({ data: post ?? null }, { status: post ? 200 : 404 }),
    );
  } catch (error) {
    console.error(error);
    return cors(
      req,
      NextResponse.json(
        { error: error instanceof Error ? error.message : "Bad request." },
        { status: 400 },
      ),
    );
  }
}
