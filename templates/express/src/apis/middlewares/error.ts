import { NextFunction, Request, Response } from 'express';

import { commonError } from '../../constants';
import { ErrorResponse } from '../../utils/err-res';

const createErrorInfoDevelopment = (err: ErrorResponse) => {
    return {
        statusCode: err?.statusCode || 500,
        message: err.message,
        stack: err.stacks || err.stack,
    };
};

const createErrorInfoProduction = (err: ErrorResponse) => {
    return {
        statusCode: err?.statusCode || commonError.wrong.statusCode,
        message: err.isOperational ? err.message : commonError.wrong.message,
    };
};

export const errorHandler = (
    err: ErrorResponse,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    let errorInfo;
    let errorResponse = err;
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (errorResponse.name === 'UnauthorizedError') {
        errorResponse = new ErrorResponse(commonError.unauthorized);
    }

    if (isDevelopment) {
        errorInfo = createErrorInfoDevelopment(errorResponse);
    } else {
        errorInfo = createErrorInfoProduction(errorResponse);
    }

    res.status(errorInfo.statusCode).json(errorInfo);
};
