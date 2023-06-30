"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonError = void 0;
exports.commonError = {
    notFound: {
        statusCode: 404,
        message: "Not Found",
    },
    forbidden: {
        statusCode: 403,
        message: "Forbidden",
    },
    conflict: {
        statusCode: 409,
        message: "Already Exist",
    },
    wrong: {
        statusCode: 500,
        message: "Internal Server Error",
    },
    unauthorized: {
        statusCode: 401,
        message: "Unauthorized",
    },
    tooLarge: {
        statusCode: 413,
        message: "Payload Too Large",
    },
    badRequest: {
        statusCode: 400,
        message: "Bad Request",
    },
    unexpectedField: {
        statusCode: 400,
        message: "Unexpected Field",
    },
    invalidQuery: {
        statusCode: 400,
        message: "Invalid Query Parameters",
    },
    invalidPathParams: {
        statusCode: 400,
        message: "Invalid Path Parameters",
    },
    invalidState: {
        statusCode: 422,
        message: "Invalid State",
    },
};
