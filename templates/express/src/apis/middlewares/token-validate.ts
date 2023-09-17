import { commonError } from '@/constants';
import { ErrorResponse } from '@/utils/err-res';
import { getAccessToken } from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

export const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = getAccessToken(req.headers.authorization);

        if (!access_token) {
            throw new ErrorResponse(commonError.unauthorized);
        }

        next();
    } catch (e) {
        next(e);
    }
};
