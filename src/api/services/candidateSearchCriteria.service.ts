import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export interface CandidateSearchCriteriaResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number | null;
  responsePayload: any[];
}

export class CandidateSearchCriteriaService {
  static async getCandidateSearchCriteria(): Promise<CandidateSearchCriteriaResponse> {
    const url = ENDPOINTS.CANDIDATE.searchCriteria;
    return ApiClient.get<CandidateSearchCriteriaResponse>(url);
  }
}
