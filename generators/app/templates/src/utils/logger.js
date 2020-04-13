import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
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
    `${timestamp} [ ${serviceName}, ${correlationId ||
      '-'} ] [${moduleName || moduleDefault}] [${level}] : ${message}`
);

const dailyRoateTransformer = new transports.DailyRotateFile({
  filename: `${config.apiName}_%DATE%`,
  zippedArchive: true,
  extension: '.log',
  dirname: config.log.filePath,
  createSymlink: true,
  symlinkName: `${config.apiName}.log`,
});

const winstonLogger = createLogger({
  level: config.env == 'local' ? 'debug' : 'info',
  format: combine(timestamp(), logFormatPrintf),
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

winstonLogger.morganStream = {
  write: function(message) {
    winstonLogger.info(message, { module: 'logger.js' });
  },
};

winstonLogger.debug = function(message, meta) {
  this.log({ level: 'debug', message: message, ...meta });
};

const middleware = morgan('combined', { stream: winstonLogger.morganStream });

export default winstonLogger;
export { middleware as loggerMiddleware };
