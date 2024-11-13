import cors from "edge-cors";
import { type NextRequest, NextResponse } from "next/server";
import { fetchPost } from "react-bluesky/api";

export const fetchCache = "only-cache";

export async function GET(req: NextRequest) {
  try {
    const uri = req.nextUrl.searchParams.get("uri");

    let post = null;

    if (uri) post = await fetchPost(uri);

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
