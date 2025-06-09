/**
  * Defines the status for the 'Do Not Disturb' setting.
  * 'Y' for Yes (enabled), 'N' for No (disabled).
  */
export type DoNotDisturbStatus = 'Y' | 'N';

export interface UpdateDoNotDisturbRequest {
  doNotDisturb: DoNotDisturbStatus;
}

export interface DoNotDisturbApiResponse {
  status: string;           // API call status (e.g., "OK", "ERROR")
  errorId: string | null;   // Error ID if the status is not OK
  successMessage: string | null; // Success message if applicable
  errorMessages: string | null; // Error messages if applicable
}
