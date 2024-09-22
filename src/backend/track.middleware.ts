import { EVENTS } from "~/constants";

interface Payload {
  type: string;
  userId?: string;
  timestamp: number;
  data?: object;
  trackingId: string;
}

export default function isValidPayload(payload: Payload): boolean {
  return (
    !!payload.type &&
    (payload.type === EVENTS.INIT || !!payload.userId) &&
    (payload.type === EVENTS.INIT || !!payload.data) &&
    !!payload.timestamp &&
    !!payload.trackingId
  );
}
