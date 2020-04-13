import HttpStatus from 'http-status-codes';

function healthController(req, res) {
  res.status(HttpStatus.OK).send({ status: 'UP' });
}

function healthRouter(app) {
  app.use('/health', healthController);
}

export default healthRouter;
