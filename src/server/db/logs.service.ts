/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "./db";

export interface LogPayload {
  type: string;
  userId: string;
  timestamp: Date;
  data: any;
  trackingId: string;
}

export interface LogFilter {
  type?: string;
  timestamp?: { gt: Date };
  trackingId?: string;
}

/**
 * Add a log entry to the database.
 * @param payload - The log data to be inserted.
 * @returns Promise<void> - A promise that resolves when the log entry is added.
 */
async function addLog(payload: LogPayload): Promise<void> {
  try {
    await db.log.create({
      data: {
        type: payload.type,
        userId: payload.userId ?? "",
        timestamp: new Date(payload.timestamp), // Convert timestamp to Date
        data: payload.data ?? {},
        trackingId: payload.trackingId,
      },
    });
    console.log("Log entry added successfully");
  } catch (error: unknown) {
    // Handle Prisma-specific errors
    if (error instanceof Error) {
      console.error("Error adding log entry:", error.message);
    } else {
      console.error("Unknown error adding log entry");
    }
  } finally {
    await db.$disconnect();
  }
}

/**
 * Read log entries from the database based on trackingId and type.
 * @param trackingId - The tracking ID to filter logs.
 * @returns Promise<LogPayload[]> - A promise that resolves to an array of log entries.
 */
async function readLogs(filters: LogFilter): Promise<LogPayload[]> {
  try {
    const logs = await db.log.findMany({
      where: filters,
    });
    return logs;
  } catch (error: unknown) {
    console.error("Error retrieving log entries", error);
    return [];
  }
}

export { addLog, readLogs };
