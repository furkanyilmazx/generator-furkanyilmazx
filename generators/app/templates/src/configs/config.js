import fs from 'fs';
require('dotenv').config();

function getJWTProperties() {
  if (process.env.JWT_ENABLED !== 'true') return;
  try {
    if (
      process.env.JWT_ALGORITHM === 'RSA256' &&
      process.env.JWT_PRIVATE_KEY_FILE_NAME &&
      process.env.JWT_PUBLIC_KEY_FILE_NAME
    ) {
      return {
        privateKeyFile: fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILE_NAME),
        privateKeyFileName: process.env.JWT_PRIVATE_KEY_FILE_NAME,
        publicKeyFile: fs.readFileSync(process.env.JWT_PUBLIC_KEY_FILE_NAME),
        publicKeyFileName: process.env.JWT_PUBLIC_KEY_FILE_NAME,
      };
    } else if (
      process.env.JWT_ALGORITHM === 'SHA256' &&
      process.env.JWT_SECRET
    ) {
      return {
        secret: process.env.JWT_SECRET,
      };
    } else {
      throw new Error('JWT Config doesnt correct please check it out');
    }
  } catch (error) {
    console.error(error);
    throw new Error('JWT Config doesnt correct please check it out');
  }
}

function getSSLProperties() {
  if (process.env.SSL_ENABLED !== 'true') return;
  try {
    return {
      certFile: fs.readFileSync(process.env.SSL_CERT_FILE),
      keyFile: fs.readFileSync(process.env.SSL_KEY_FILE),
      passpharase: process.env.SSL_PASSPHARASE,
    };
  } catch (error) {
    console.error(error);
    throw new Error('SSL Config doesnt correct please check it out');
  }
}

const CONFIG = {
  apiName: process.env.SERVICE_NAME,
  appPort: process.env.PORT,
  env: process.env.API_ENV,
  debugMode: process.env.DEBUG_MODE,
  database: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    url: process.env.DB_URL,
  },
  log: {
    level: process.env.LOG_LEVEL,
    filePath: process.env.LOG_PATH,
  },
  jwt: {
    enabled: process.env.JWT_ENABLED === 'true',
    algorithm: process.env.JWT_ALGORITHM,
    issuer: process.env.JWT_ISSUER,
    accessTokenExpireIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
    refreshTokenExpireIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
    ...getJWTProperties(),
  },
  ssl: {
    enabled: process.env.SSL_ENABLED === 'true',
    ...getSSLProperties(),
  },
  eureka: {
    url: "EUREKA_URL",
  },
};

export default CONFIG;
