import apiClient from "../apiClient";
import { ENDPOINTS } from "../endPoints";

export class JobsService {
  static async getRecommendedJobs(
    page: number,
    pageSize: number,
    sortBy: 'RELEVANCE' | 'NEWEST' | 'PAYRATE',
    jobCategory?: string,
    durationFrom?: null,
    durationTo?: null,
  ): Promise<any[]> {
    const endpoint = `${ENDPOINTS.DASHBOARD.recommendedJobs}/${page}/${pageSize}`;
    const params = {
      sortBy,
      durationFrom,
      durationTo,
      ...(jobCategory && { job_category: jobCategory }),
    };
    return apiClient.post<any[]>(endpoint, params);
  }
}