import express from 'express';

import sampleRouter from './v1/sampleRouter';

function apiV1Routes(app) {
  const apiV1Router = express.Router();

  apiV1Router.use('/sample', sampleRouter);

  app.use('/api/v1', apiV1Router);
}

export default apiV1Routes;
