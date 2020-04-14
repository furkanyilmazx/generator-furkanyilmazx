import util from 'util';
import jwt from 'jsonwebtoken';

import BaseError from '@<%= appNameUpperCamelCase %>/error/BaseError';
import AuthError from '@<%= appNameUpperCamelCase %>/error/AuthError';

import config from '@<%= appNameUpperCamelCase %>/configs/config';

import Logger from '@<%= appNameUpperCamelCase %>/utils/logger';

const logger = Logger.child({ module: 'authMiddleware.js' });

const jwtVerifyAsync = util.promisify(jwt.verify);

async function JwtMiddleware(req, res, next) {
  let token =
    req.headers['<%= appNameForTokenHeader %>-x-access-token'] ||
    req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);

    try {
      let decoded = await jwtVerifyAsync(token, config.jwt.publicKeyFile, {
        algorithm: 'RS256',
      });
      res.locals.tokenContent = decoded;
      res.locals.memberId = decoded.memberId;
      next();
    } catch (error) {
      logger.debug(error instanceof jwt.TokenExpiredError);
      if (error instanceof jwt.TokenExpiredError)
        next(new AuthError('errors.general'));
      else if (error instanceof jwt.JsonWebTokenError)
        next(new AuthError('errors.general'));
      else next(new BaseError('errors.general'));
    }
  } else {
    logger.error('Token not found', token);
    next(new AuthError('errors.general'));
  }
}

export default JwtMiddleware;
