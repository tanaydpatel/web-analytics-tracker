import axios from "axios";
import { API_ENDPOINTS } from "~/constants";

interface getLogs {
  trackingId: string;
  type?: string;
  timestamp?: string;
  skip?: number;
}

export default async function getLogs({
  trackingId,
  type,
  timestamp,
  skip,
}: getLogs): Promise<any> {
  try {
    const query = `?trackingId=${trackingId}&type=${type ?? ""}&timestamp=${timestamp ?? ""}&skip=${skip ?? 0}&limit=100`;
    const logs = await axios.get(`${API_ENDPOINTS.LOGS}${query}`);
    if (logs.status === 200) {
      return logs.data;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving log entries", error);
    return null;
  }
}
