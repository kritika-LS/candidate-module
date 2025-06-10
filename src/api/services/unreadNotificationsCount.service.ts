import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { UnreadNotificationsCountApiResponse } from '../../models/types/notifications';

export class UnreadNotificationsCountService {

  static async getCount(): Promise<UnreadNotificationsCountApiResponse> {
    const endpoint = ENDPOINTS.CANDIDATE.unreadNotificationsCount;

    try {
      const response = await apiClient.get<UnreadNotificationsCountApiResponse>(endpoint);

      return response;
    } catch (error) {
      console.error("Error in UnreadNotificationsCountService.getCount:", error);
      throw error;
    }
  }
}
