import apiClient from "../apiClient";
import { ENDPOINTS } from '../endPoints';
import { ScreeningInterviewResponse } from '../../models/types/screeningInterview';

export const screeningInterviewService = {
  getScreeningInterviews: async (page: number, pageSize: number): Promise<ScreeningInterviewResponse> => {
    const response = await apiClient.get<ScreeningInterviewResponse>(
      `${ENDPOINTS.CANDIDATE.getScreening}/${page}/${pageSize}`
    );
    return response;
  },
}; 