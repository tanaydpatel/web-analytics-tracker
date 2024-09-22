import { NextRequest, NextResponse } from "next/server";
import { LogFilter, LogPayload, readLogs } from "~/server/db/logs.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingId = searchParams.get("trackingId");
    const type = searchParams.get("type") ?? undefined;
    const timestamp = searchParams.get("timestamp") ?? undefined;

    if (!trackingId) {
      throw new Error("Invalid trackingId");
    }

    const filters: LogFilter = { trackingId };
    if (type) filters.type = type;
    if (timestamp) filters.timestamp = { gt: new Date(timestamp) };

    const logs: LogPayload[] = await readLogs(filters);

    if (!logs.length) {
      throw new Error("No entry found");
    }
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
