
import { ZodSchema, ZodError } from "zod";
import { Response, Request, NextFunction } from "express";
import { sendError } from "../utils";

interface ZodErrorMessage {
    expected: string;
    code: string;
    path: string[];
    message: string
}

export function validateRequest<T>(
  schema: ZodSchema<T>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      // Get the first error message
      const parsedErrorMessage: ZodErrorMessage[] = JSON.parse(parsedData.error.message)
      const errors = parsedErrorMessage.map(m=> m?.message)
      const firstError = errors[0] || "Invalid request";
      return sendError(res, firstError, 400);
    }

    // attach the parsed data to request for type-safe access in controller
    req.body = parsedData.data;
    next();
  };
}
