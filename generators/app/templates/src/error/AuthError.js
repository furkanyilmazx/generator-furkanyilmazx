import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

class AuthError extends BaseError {
  constructor(code, message) {
    super(code, message);
    this.name = this.constructor.name;
    this.status = HttpStatus.UNAUTHORIZED;
  }
}

export default AuthError;
