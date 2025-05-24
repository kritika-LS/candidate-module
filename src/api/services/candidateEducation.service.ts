import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class CandidateEducationService {
  static async getCandidateEducations(): Promise<any> { // Replace 'any' with a specific type
    const url = ENDPOINTS.CANDIDATE.educations;
    return ApiClient.get<any>(url);
  }

  static async updateCandidateEducations(payload: any): Promise<any> {
    const url = ENDPOINTS.CANDIDATE.educations;
    return ApiClient.put<any>(url, payload);
  }
}