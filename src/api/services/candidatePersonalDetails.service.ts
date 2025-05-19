import ApiClient from '../apiClient';
 import { ENDPOINTS } from '../endPoints';

 export class CandidatePersonalDetailsService {
  static async getCandidatePersonalDetails(): Promise<any> { // Replace 'any' with a specific type
    const url = ENDPOINTS.CANDIDATE.personalDetails;
    return ApiClient.get<any>(url);
  }
 }