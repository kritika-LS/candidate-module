import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class CandidateWorkHistoryService {
  static async getCandidateWorkHistory(): Promise<any> { // Replace 'any' with a specific type
    const url = ENDPOINTS.CANDIDATE.workHistory;
    return ApiClient.get<any>(url);
  }

  static async updateCandidateWorkHistory(payload: any): Promise<any> {
    const url = ENDPOINTS.CANDIDATE.workHistory;
    return ApiClient.put<any>(url, payload);
  }
}