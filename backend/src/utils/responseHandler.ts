import { Response } from "express";
import { ApiResponse, ServiceResult } from "../types";

export const sendSuccess = <T>(res: Response, data?: T, message?: string, statusCode: number = 200)=> {
    const response: ApiResponse<T> = {
        success: true,
        data,
        ...(message && {message: message})
    }
    return res.status(statusCode).json(response);
}

export const sendError = (res: Response, message: string, statusCode: number = 400)=>{
    const response: ApiResponse = {
        success: false,
        error: message,
    }
    return res.status(statusCode).json(response)
}

export const sendServiceResult = <T>(success: boolean, data?: T, error?: string): ServiceResult<T>=>{
    const response: ServiceResult<T> = {
        success: success,
        ...(data && {data: data}),
        ...(error && {error: error}),
    }
    return response
}