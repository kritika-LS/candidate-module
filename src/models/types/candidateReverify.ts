export interface ReverifyRequestBody {
  password: string;
}

export interface ReverifyApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
}
