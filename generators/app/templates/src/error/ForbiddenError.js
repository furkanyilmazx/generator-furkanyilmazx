import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

class ForbiddenError extends BaseError {
  constructor(code, message) {
    super(code, message);
    this.name = this.constructor.name;
    this.status = HttpStatus.FORBIDDEN;
  }
}

export default ForbiddenError;
