"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const isEnvFound = dotenv_1.default.config();
if (isEnvFound.error) {
    throw new Error("Couldn't find .env file");
}
exports.config = {
    port: process.env.PORT,
    jwt: {
        algorithm: process.env.JWT_ALGORITHM,
        secret: process.env.JWT_SECRET,
        expire: {
            access: process.env.JWT_EXPIRE_ACCESS,
            refresh: process.env.JWT_EXPIRE_REFRESH,
        },
    },
};
const checkEnvPropertiesAssigned = (config) => {
    for (let key in config) {
        if (!config[key]) {
            throw new Error(`.env ${key} is not found`);
        }
        if (typeof config === "object" && config !== null) {
            checkEnvPropertiesAssigned(config[key]);
        }
    }
};
checkEnvPropertiesAssigned(exports.config);
