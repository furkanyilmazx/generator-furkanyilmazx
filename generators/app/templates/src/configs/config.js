import fs from "fs";
require("dotenv").config();

const CONFIG = {
  apiName: process.env.SERVICE_NAME,
  appPort: process.env.PORT,
  env: process.env.API_ENV,
  debugMode: process.env.DEBUG_MODE,
<%if (isDatabaseActive) { %>

  database: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    url: process.env.DB_URL
  },
<% } %>
  log: {
    level: process.env.LOG_LEVEL,
    filePath: process.env.LOG_PATH
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    privateKeyFile: fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILE_NAME),
    privateKeyFileName: process.env.JWT_PRIVATE_KEY_FILE_NAME,
    publicKeyFile: fs.readFileSync(process.env.JWT_PUBLIC_KEY_FILE_NAME),
    publicKeyFileName: process.env.JWT_PUBLIC_KEY_FILE_NAME,
    issuer: 'https://www.<%= appName %>.com',
    tokenExpireIn: '30m',
    accessTokenLifeTime: 3600,
    refreshTokenLifeTime: 1209600,

  },
<%if (isSslActive) { %>
  ssl: {
    certFile: fs.readFileSync(process.env.SSL_CERT_FILE),
    keyFile: fs.readFileSync(process.env.SSL_KEY_FILE),
    passpharase: process.env.SSL_PASSPHARASE
  }
<% } %>
};

export default CONFIG;
