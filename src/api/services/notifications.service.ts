import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { NotificationsApiResponse } from '../../models/types/notifications';


export class NotificationsService {
  static async getNotifications(): Promise<NotificationsApiResponse> {
    const endpoint = ENDPOINTS.CANDIDATE.notifications;

    try {
      const response = await apiClient.get<NotificationsApiResponse>(endpoint);

      return response;
    } catch (error) {
      console.error("Error in NotificationsService.getNotifications:", error);
      throw error;
    }
  }
}
