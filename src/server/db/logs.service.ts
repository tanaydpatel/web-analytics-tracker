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
 * @returns Promise<boolean> - A promise that resolves when the log entry is added.
 */
async function addLog(payload: LogPayload): Promise<boolean> {
  try {
    const status = await db.log.create({
      data: {
        type: payload.type,
        userId: payload.userId ?? "",
        timestamp: new Date(payload.timestamp), // Convert timestamp to Date
        data: payload.data ?? {},
        trackingId: payload.trackingId,
      },
    });
    if (status.id) {
      console.log("Log entry added successfully", status);
      return true;
    }
    throw new Error("Error adding log entry");
  } catch (error) {
    console.error((error as Error).message, error);
    return false;
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
  } catch (error) {
    console.error("Error retrieving log entries", error);
    return [];
  }
}

export { addLog, readLogs };
