import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class ValidationError extends BaseError {
  constructor(code, message) {
    super(code, message);
    this.name = this.constructor.name;
    this.status = HttpStatus.BAD_REQUEST;
  }
}
