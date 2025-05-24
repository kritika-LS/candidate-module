import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class CandidateProfessionalInfoService {
  static async getCandidateProfessionalInformation(): Promise<any> {
    const url = ENDPOINTS.CANDIDATE.professionalInformation;
    return ApiClient.get<any>(url);
  }

  static async updateCandidateProfessionalInformation(payload: any): Promise<any> {
    const url = ENDPOINTS.CANDIDATE.professionalInformation;
    return ApiClient.put<any>(url, payload);
  }
}