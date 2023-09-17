import cors from 'cors';
import morgan from 'morgan';

import { router } from '../apis/routes';
import { commonError } from '@/constants';
import express, { Application, json, urlencoded } from 'express';
import { ErrorResponse } from '@/utils/err-res';
import { errorHandler } from '@/apis/middlewares/error';

export const loader = (app: Application) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));

    app.use(express.static('public'));
    app.use(morgan('dev'));
    app.use(cors());

    app.use('/', router);

    app.get('/status', (req, res) => {
        return res.json({});
    });

    app.all('*', (_req, _res, next) => {
        next(new ErrorResponse(commonError.notFound));
    });

    app.use(errorHandler);
};
