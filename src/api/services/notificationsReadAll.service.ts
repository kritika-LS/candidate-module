import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { MarkAllNotificationsAsReadApiResponse } from '../../models/types/notifications';

export class NotificationsReadAllService {
  static async markAllAsRead(): Promise<MarkAllNotificationsAsReadApiResponse> {
    const endpoint = ENDPOINTS.CANDIDATE.markAllNotificationsAsRead;

    try {
      const response = await apiClient.put<MarkAllNotificationsAsReadApiResponse>(endpoint, null);

      return response;
    } catch (error) {
      console.error("Error in NotificationsReadAllService.markAllAsRead:", error);
      throw error;
    }
  }
}
