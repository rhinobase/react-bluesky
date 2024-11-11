import cors from "edge-cors";
import { NextResponse } from "next/server";
import { fetchPost } from "react-bluesky";

type RouteSegment = { params: { handle: string; id: string } };

export const fetchCache = "only-cache";

export async function GET(req: Request, { params }: RouteSegment) {
  try {
    const post = await fetchPost(params.handle, params.id);

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
