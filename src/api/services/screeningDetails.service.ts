import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { ScreeningDetailsApiResponse, ScreeningDetailsItem } from '../../models/types/screeningDetails';

export class ScreeningDetailsService {
  static async getDetails(candidatePoolId: string): Promise<ScreeningDetailsApiResponse> {

    const endpoint = `${ENDPOINTS.CANDIDATE.getScreeningDetails}/${candidatePoolId}`;

    try {
      const response = await apiClient.get<ScreeningDetailsApiResponse>(endpoint);

      return response;
    } catch (error) {
      console.error("Error in ScreeningDetailsService.getDetails:", error);
      throw error;
    }
  }
}
