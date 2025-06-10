import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { MarkNotificationAsReadApiResponse } from '../../models/types/notifications';

export class NotificationsReadOneService {

  static async markAsRead(notificationId: string): Promise<MarkNotificationAsReadApiResponse> {
    const endpoint = `${ENDPOINTS.CANDIDATE.markNotificationAsRead}/${notificationId}`;

    try {
      const response = await apiClient.put<MarkNotificationAsReadApiResponse>(endpoint, null);

      return response;

    } catch (error) {
      console.error("Error in NotificationsReadOneService.markAsRead:", error);
      throw error;
    }
  }
}
