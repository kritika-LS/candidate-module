export interface NotificationItem {
  notificationId: string;
  type: 'JOB_UPDATE' | 'INTERVIEW_REMINDER' | 'ALERT' | 'INFO';
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface NotificationsApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number;
  responsePayload: NotificationItem[];
}

export interface FetchNotificationsRequest {
}

export interface MarkAllNotificationsAsReadApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
}

export interface UnreadNotificationsCountApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  responsePayload: number;
}

export interface MarkNotificationAsReadApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
}