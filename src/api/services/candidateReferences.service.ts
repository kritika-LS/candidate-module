import ApiClient from '../apiClient';
 import { ENDPOINTS } from '../endPoints';

 export class CandidateReferencesService {
  static async getCandidateReferences(): Promise<any> {
    const url = ENDPOINTS.CANDIDATE.references;
    return ApiClient.get<any>(url);
  }
 }