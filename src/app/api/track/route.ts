/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextRequest, NextResponse } from "next/server";
import { addLog } from "~/server/db/logs.service";

import isValidPayload from "~/server/track.middleware";

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
    const success = await addLog({
      type,
      userId,
      timestamp: new Date(timestamp),
      data,
      trackingId,
    });
    if (success) {
      return NextResponse.json({ message: "Recorded" }, { status: 200 });
    } else {
      throw new Error("Error adding log entry");
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
