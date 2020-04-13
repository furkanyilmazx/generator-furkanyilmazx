import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  constructor(code, message) {
    super(code, message);
    this.name = this.constructor.name;
    this.status = HttpStatus.NOT_FOUND;
  }
}
