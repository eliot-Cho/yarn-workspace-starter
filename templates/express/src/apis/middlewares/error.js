"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constants_1 = require("../../constants");
const error_res_1 = require("@/utils/error-res");
const createErrorInfoDevelopment = (err) => {
    return {
        statusCode: err?.statusCode || 500,
        message: err.message,
        stack: err.stacks || err.stack,
    };
};
const createErrorInfoProduction = (err) => {
    return {
        statusCode: err?.statusCode || constants_1.commonError.wrong.statusCode,
        message: err.isOperational ? err.message : constants_1.commonError.wrong.message,
    };
};
const errorHandler = (err, _req, res, _next) => {
    let errorInfo;
    let errorResponse = err;
    const isDevelopment = process.env.NODE_ENV === "development";
    if (errorResponse.name === "UnauthorizedError") {
        errorResponse = new error_res_1.ErrorResponse(constants_1.commonError.unauthorized);
    }
    if (isDevelopment) {
        errorInfo = createErrorInfoDevelopment(errorResponse);
    }
    else {
        errorInfo = createErrorInfoProduction(errorResponse);
    }
    res.status(errorInfo.statusCode).json(errorInfo);
};
exports.errorHandler = errorHandler;
