import axios from "axios";
import { API_ENDPOINTS } from "~/constants";

interface testInstallation {
  trackingId: string;
}

export default async function testInstallation({
  trackingId,
}: testInstallation): Promise<any> {
  try {
    const logs = await axios.get(
      `${API_ENDPOINTS.LOGS}?trackingId=${trackingId}&type=init`,
    );
    if (logs.status === 200 && logs.data.length > 0) {
      return true;
    }
    throw new Error();
  } catch (error) {
    console.error("Error retrieving log entries", error);
    return false;
  }
}
