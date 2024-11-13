import cors from "edge-cors";
import { NextResponse } from "next/server";
import { fetchPost } from "react-bluesky/api";

type RouteSegment = { params: { uri: string } };

export const fetchCache = "only-cache";

export async function GET(req: Request, { params }: RouteSegment) {
  try {
    const post = await fetchPost(params.uri);

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
