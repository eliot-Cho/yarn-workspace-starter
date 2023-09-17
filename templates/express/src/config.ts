import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';

const isEnvFound = dotenv.config();

if (isEnvFound.error) {
    throw new Error("Couldn't find .env file");
}

interface Config {
    port: string;
    jwt: {
        algorithm: Algorithm;
        secret: string;
        expire: {
            access: number;
            refresh: number;
        };
    };
}

export const config: Config = {
    port: process.env.PORT || '8080',
    jwt: {
        algorithm: (process.env.JWT_ALGORITHM as Algorithm) || 'HS256',
        secret: process.env.JWT_SECRET || '',
        expire: {
            access: parseFloat(process.env.JWT_EXPIRE_ACCESS || '0'),
            refresh: parseFloat(process.env.JWT_EXPIRE_REFRESH || '0'),
        },
    },
};

const checkEnvPropertiesAssigned = (config: Record<string, any>) => {
    for (let key in config) {
        if (!config[key]) {
            throw new Error(`.env ${key} is not found`);
        }

        if (typeof config === 'object' && config !== null) {
            checkEnvPropertiesAssigned(config[key]);
        }
    }
};

checkEnvPropertiesAssigned(config);
