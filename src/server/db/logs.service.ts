/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "./db";

interface LogPayload {
  type: string;
  userId: string;
  timestamp: Date;
  data: any;
  trackingId: string;
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
async function readLogs(trackingId: string): Promise<LogPayload[]> {
  try {
    const logs = await db.log.findMany({
      where: {
        trackingId: trackingId,
      },
    });
    console.log("Log entries retrieved successfully");
    return logs;
  } catch (error: unknown) {
    // Handle Prisma-specific errors
    if (error instanceof Error) {
      console.error("Error retrieving log entries:", error.message);
    } else {
      console.error("Unknown error retrieving log entries");
    }
    return [];
  } finally {
    await db.$disconnect();
  }
}

export { addLog, readLogs };
