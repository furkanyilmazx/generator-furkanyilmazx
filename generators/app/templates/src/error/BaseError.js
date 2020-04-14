import HttpStatus from 'http-status-codes';
import i18n from '@<%= appNameUpperCamelCase %>/utils/i18n';

class BaseError extends Error {
  constructor(msg, ...rest) {
    const messageAnCode = i18n.__(msg, ...rest).split(';;');
    const code = messageAnCode[0];
    const message = messageAnCode[1];

    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default BaseError;
