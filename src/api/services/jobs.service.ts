import apiClient from "../apiClient";
import { ENDPOINTS } from "../endPoints";


 export class JobsService {
  static async getRecommendedJobs(
    page: number,
    pageSize: number,
    sortOrder: 'Asc' | 'Desc',
    sortBy: 'RELEVANCE'
  ): Promise<any[]> {
    return apiClient.get<any[]>(
        `${ENDPOINTS.DASHBOARD.recommendedJobs}/${page}/${pageSize}?sortOrder=${sortOrder}&sortBy=${sortBy}`,);
  }
 }