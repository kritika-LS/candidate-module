export interface RescheduleInterviewRequestBody {
  preferredScreeningDate: string; // Date and time in ISO 8601 format (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ")
  screeningConsentIpAddress: string | null; // IP address for consent, or null
  screeningConsentStatus: 'Y' | 'N'; // Consent status (Yes/No)
  candidatePoolId: number; // The ID of the candidate pool
 }

 export interface RescheduleInterviewApiResponse {
  status: string;           // API call status (e.g., "OK", "ERROR")
  errorId: string | null;   // Error ID if the status is not OK
  successMessage: string | null; // Success message if applicable
  errorMessages: string | null; // Error messages if applicable
 }
