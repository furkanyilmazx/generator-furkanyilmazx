import HttpStatus from 'http-status-codes';
import i18n from '@<%= appNameUpperCamelCase %>/utils/i18n';
import { ERROR_CODE } from '@<%= appNameUpperCamelCase %>/constants';
import { checkIfInEnum } from '@<%= appNameUpperCamelCase %>/utils/enumUtils';

class BaseError extends Error {
  constructor(code, message) {
    if (!checkIfInEnum(ERROR_CODE, code)) code = ERROR_CODE.GENERAL;

    super(message || i18n.__(`error.message.${code}`));
    this.name = this.constructor.name;
    this.code = code;
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default BaseError;
