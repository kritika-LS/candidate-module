export interface ScreeningDetailsItem {
  interviewId: string;
  candidateId: string;
  jobId: string;
  jobTitle: string;
  clientEnterpriseName: string;
  jobCity: string;
  jobState: string;
  jobCountry: string;
  preferredScreeningDate: string;
  interviewDurationMinutes: number;
  numberOfQuestions: number;
  interviewStatus: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  interviewPlatform?: string;
  interviewLink?: string;
  interviewerDetails?: {
    name: string;
    title: string;
    email?: string;
  };
  instructions?: string;
  candidateName?: string;
}

export interface ScreeningDetailsApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  responsePayload: ScreeningDetailsItem;
}
