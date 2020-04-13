import Response from '@<%= appNameUpperCamelCase %>/common/Response';

import { SampleRequest } from '@<%= appNameUpperCamelCase %>/models/requests/sample';
import { SampleResponse } from '@<%= appNameUpperCamelCase %>/models/responses/sample';
import { sampleRequestValidator } from '@<%= appNameUpperCamelCase %>/validators/sample';
import { sampleService } from '@<%= appNameUpperCamelCase %>/services/sample';

import Logger from '@<%= appNameUpperCamelCase %>/utils/logger';

const logger = Logger.child({ module: 'sampleController.js' });

export async function sampleController(req, res, next) {
  try {
    const sampleRequest = SampleRequest(req);
    
    sampleRequestValidator(req);
    
    const sampleDTO = await sampleService(sampleRequest);
    const sampleResponse = SampleResponse(sampleDTO);

    return new Response({
      result: sampleResponse,
    }).send(res);
  } catch (err) {
    logger.error('An error occured at sampleController: ', err);
    next(err); // when error you should pass error to error middleware
  }
}
