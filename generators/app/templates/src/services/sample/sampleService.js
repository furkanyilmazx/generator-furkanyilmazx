import BaseError from '@<%= appNameUpperCamelCase %>/error/BaseError';
import AuthError from '@<%= appNameUpperCamelCase %>/error/AuthError';

import Logger from '@<%= appNameUpperCamelCase %>/utils/logger';

const logger = Logger.child({ module: 'sampleService.js' });

export async function sampleService(sampleRequest) {
  try {
    logger.info('Entering');
    logger.debug('Returning sample DTO');
    return {
      sampleName: `Sample ${sampleRequest.sampleId || 'sapmleid'}`,
      sampleDescription: 'This is description of this sample',
      databaseId: 1,
    };
  } catch (err) {
    logger.error(err);
    if (err instanceof BaseError) {
      throw new AuthError(1005, 'Login failed');
    }
    throw new BaseError(1004, 'An error occured');
  }
}
