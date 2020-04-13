import express from 'express';
import cors from 'cors';
import compression from 'compression';
import 'express-async-errors';

import apiV1Routes from '@<%= appNameUpperCamelCase %>/routers/apiV1Routes';
import healthRouter from '@<%= appNameUpperCamelCase %>/routers/healthRouter';
import errorMiddleware from '@<%= appNameUpperCamelCase %>/middlewares/errorMiddleware';
import localeMiddleware from '@<%= appNameUpperCamelCase %>/middlewares/localeMiddleware';
import Logger, { loggerMiddleware } from '@<%= appNameUpperCamelCase %>/utils/logger';

import config from '@<%= appNameUpperCamelCase %>/configs/config';

const { apiName, appPort = 8080, ssl } = config;

const logger = Logger.child({ module: 'index.js' });

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(localeMiddleware);
app.use(compression());

healthRouter(app);
apiV1Routes(app);

app.use(errorMiddleware);

app.listen(appPort, () => {
  logger.info(`${apiName} started`);
  logger.info(`Server listening to ${appPort}....`);
  logger.info('Press Ctrl+C to quit.');
});
