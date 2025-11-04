

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: any;
}

export interface ServiceResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}