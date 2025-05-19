import ApiClient from '../apiClient';
 import { ENDPOINTS } from '../endPoints';

 export class CandidateService {
  static async getCandidate(): Promise<any> { // Replace 'any' with a specific type
    const url = ENDPOINTS.CANDIDATE.candidate;
    return ApiClient.get<any>(url);
  }
 }