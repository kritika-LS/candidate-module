import apiClient from "../apiClient";
import { ENDPOINTS } from "../endPoints";


 export class PendingActionsService {
  static async getPendingActions(): Promise<any[]> {
    const url = `${ENDPOINTS.DASHBOARD.pendingActions}`;
    return apiClient.get<any[]>(url);
  }
 }