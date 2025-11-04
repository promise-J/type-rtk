export interface ApiError {
  status: number;
  data: { success: boolean, error: string};
  message?: string;
}

export interface ApiSuccess<T> {
    success: boolean;
    data: T,
    message: string;
}