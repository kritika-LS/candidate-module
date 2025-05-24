export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
  code?: string;
  response?: any;
}
