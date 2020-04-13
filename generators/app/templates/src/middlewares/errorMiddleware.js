import HttpStatus from 'http-status-codes';

import BaseError from '@<%= appNameUpperCamelCase %>/error/BaseError';
import Response from '@<%= appNameUpperCamelCase %>/common/Response';

import Logger from '@<%= appNameUpperCamelCase %>/utils/logger';

const logger = Logger.child({ module: 'errorMiddleware.js' });

function errorMiddleware(err, req, res, next) {
  if (err instanceof BaseError) {
    logger.error(`An error occured code: ${err.code}, msg: ${err.message}`);
    let baseErrorResponse = new Response(err);
    baseErrorResponse.send(res);
  } else {
    logger.error('Unexpected Eror: ' + err.toString());
    console.error(err);
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default errorMiddleware;
