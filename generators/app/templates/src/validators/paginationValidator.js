import validator from 'validator';

import ValidationError from '@<%= appNameUpperCamelCase %>/error/ValidationError';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@<%= appNameUpperCamelCase %>/constants';
import logger from '@<%= appNameUpperCamelCase %>/utils/logger';

export default function paginationValidator(req, res, next) {
  logger.info('paginationValidator starting' + !req.query.page);
  req.query.page = checkPageParameter(req.query.page);
  req.query.pageSize = checkPageSizeParameter(req.query.pageSize);
  logger.info('paginationValidator completed successfully');
  next();
}

function checkPageParameter(page) {
  if (!page || validator.isEmpty(page)) {
    page = 0;
  } else {
    let tempPage = parseInt(page);
    if (tempPage != NaN) return tempPage;
    else new ValidationError(1005, 'Page must be integer');
  }
  return page;
}

function checkPageSizeParameter(pageSize) {
  if (!pageSize || validator.isEmpty(pageSize)) {
    pageSize = DEFAULT_PAGE_SIZE;
  } else {
    let tempPageSize = parseInt(pageSize);
    if (tempPageSize != NaN) {
      return tempPageSize > 0 && tempPageSize <= MAX_PAGE_SIZE
        ? tempPageSize
        : DEFAULT_PAGE_SIZE;
    } else new ValidationError(1005, 'pageSize must be integer');
  }
  return pageSize;
}
