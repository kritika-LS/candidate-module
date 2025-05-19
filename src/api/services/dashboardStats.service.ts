import ApiClient from '../apiClient';
 import { ENDPOINTS } from '../endPoints';

 export class DashboardStatsService {
  static async getDashboardStatistics(): Promise<any> { // Replace 'any' with a specific type
    const url = ENDPOINTS.DASHBOARD.dashboardStatistics;
    return ApiClient.get<any>(url);
  }
 }