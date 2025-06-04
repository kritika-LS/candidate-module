export interface ScreeningInterview {
  id: string;
  // Add other fields based on the API response
}

export interface ScreeningInterviewState {
  data: ScreeningInterview[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export interface ScreeningInterviewResponse {
  data: ScreeningInterview[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
} 