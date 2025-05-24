import apiClient from "../apiClient";
import { ENDPOINTS } from "../endPoints";

export class JobsService {
  static async getRecommendedJobs(
    page: number,
    pageSize: number,
    sortOrder: 'Asc' | 'Desc',
    sortBy: 'RELEVANCE' | 'NEWEST' | 'PAYRATE',
    jobCategory?: string
  ): Promise<any[]> {
    const endpoint = `${ENDPOINTS.DASHBOARD.recommendedJobs}/${page}/${pageSize}`;
    const params = {
      sortOrder,
      sortBy,
      ...(jobCategory && { job_category: jobCategory })
    };
    return apiClient.post<any[]>(endpoint, params);
  }
}