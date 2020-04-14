import BaseError from '@<%= appNameUpperCamelCase %>/error/BaseError';

export default class Response {
  constructor(props) {
    Object.defineProperty(this, 'httpStatus', {
      configurable: false,
      value: props.status || 200,
      writable: false,
      enumerable: false,
    });

    this.systemTime = new Date().getTime();

    if (props instanceof BaseError) {
      this.status = 'failure';
      this.errorCode = props.code;
      this.errorMessage = props.message;
      return;
    }
    const { pagination } = props;

    this.status = 'success';
    this.page = pagination && pagination.page;
    this.pageSize = pagination && pagination.pageSize;
    this.count = pagination && pagination.count;
    this.result = props.result;

    Object.defineProperty(this, 'res', {
      configurable: false,
      value: props.res,
      writable: false,
      enumerable: false,
    });
  }

  send(res) {
    let response = res || this.res;
    response.status(this.httpStatus).send(this);
  }
}
