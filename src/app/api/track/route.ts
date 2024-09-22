/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextRequest, NextResponse } from "next/server";
import isValidPayload from "~/backend/track.middleware";

export async function POST(request: NextRequest) {
  try {
    const body: {
      type: string;
      userId: string;
      timestamp: number;
      data: object;
      trackingId: string;
    } = await request.json();

    if (!isValidPayload(body)) {
      throw new Error("Invalid payload");
    }

    const { type, userId, timestamp, data, trackingId } = body;

    return NextResponse.json({ message: "Recorded" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
