import { config } from '@/config';
import jwt, { SignOptions } from 'jsonwebtoken';

const TOKEN = {
    ACCESS: 'ACCESS_TOKEN',
    REFRESH: 'REFRESH_TOKEN',
} as const;

const generateAccess = (userId: string) => {
    const jwtOptions: SignOptions = {
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expire.access * 3600,
        subject: TOKEN.ACCESS,
    };

    return jwt.sign({ userId }, config.jwt.secret, jwtOptions);
};

const generateRefresh = (userId: string) => {
    const jwtOptions: SignOptions = {
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expire.refresh * 3600,
        subject: TOKEN.REFRESH,
    };

    return jwt.sign({ userId }, config.jwt.secret, jwtOptions);
};

interface JWTPayload {
    userId: string; // email
    iat: number;
    exp: number;
    sub: string;
}

export const jwtHelper = {
    generateToken: (userId: string) => {
        const access_token = generateAccess(userId);
        const refresh_token = generateRefresh(userId);

        return { access_token, refresh_token };
    },
    decodeToken: (token: string, subject?: string) => {
        const decodedToken = jwt.verify(token, config.jwt.secret, {
            algorithms: [config.jwt.algorithm],
            subject,
        }) as JWTPayload;
        return { decodedToken };
    },
};
