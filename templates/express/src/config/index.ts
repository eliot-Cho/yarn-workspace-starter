import dotenv from "dotenv";

const isEnvFound = dotenv.config();

if (isEnvFound.error) {
  throw new Error("Couldn't find .env file");
}

export const config = {
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

const checkEnvPropertiesAssigned = (config: Record<string, any>) => {
  for (let key in config) {
    if (!config[key]) {
      throw new Error(`.env ${key} is not found`);
    }

    if (typeof config === "object" && config !== null) {
      checkEnvPropertiesAssigned(config[key]);
    }
  }
};

checkEnvPropertiesAssigned(config);
