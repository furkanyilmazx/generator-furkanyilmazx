import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import { v4 as uuidv4 } from 'uuid';
import 'winston-daily-rotate-file';

import config from '@<%= appNameUpperCamelCase %>/configs/config';

const { combine, timestamp, printf } = format;

const logFormatPrintf = printf(
  ({
    level,
    message,
    timestamp,
    serviceName,
    module: moduleName,
    moduleDefault,
    correlationId,
  }) =>
    `${timestamp} ${level} [${serviceName},${correlationId ||
      ''}] [${moduleName || moduleDefault}]: ${message}`
);

const dailyRoateTransformer = new transports.DailyRotateFile({
  filename: `${config.apiName}.log_%DATE%`,
  zippedArchive: true,
  dirname: config.log.filePath,
  createSymlink: true,
  symlinkName: `${config.apiName}.log`,
});

const winstonLogger = createLogger({
  level: config.env == 'local' ? 'debug' : 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }), logFormatPrintf),
  defaultMeta: {
    serviceName: config.apiName,
    moduleDefault: '',
  },
  transports: [dailyRoateTransformer],
});

if (config.env == 'local') {
  winstonLogger.add(
    new transports.Console({
      format: combine(timestamp(), logFormatPrintf),
    })
  );
}

function skipOptionsAndHealthcheckRequests(req, res) {
  return req.method === 'OPTIONS' || req.url === '/healthcheck';
}

winstonLogger.morganStream = {
  write: function(message) {
    winstonLogger.info(message.substring(0,message.lastIndexOf('\n'), { module: 'logger.js' });
  },
};

winstonLogger.debug = function(message, meta) {
  this.log({ level: 'debug', message: message, ...meta });
};

const correlationIdMidlleware = (req, res, next) => {
  req.correlationId = uuidv4();
  next();
};

morgan.token('correlationId', (req) => req.correlationId);
const morganLogFormat =
  ':correlationId :req[x-forwarded-for] ":method :url" :status ":referrer" ":user-agent"  :total-time ms';


const morganMiddleware = morgan(morganLogFormat, {
  stream: winstonLogger.morganStream,
  skip: skipOptionsAndHealthcheckRequests,
});
const loggerMiddleware = [correlationIdMidlleware, morganMiddleware];

export default winstonLogger;
export { loggerMiddleware };
