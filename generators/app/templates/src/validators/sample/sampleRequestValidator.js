import { ERROR_CODE } from '@<%= appNameUpperCamelCase %>/constants/enums';
import ValidationError from '@<%= appNameUpperCamelCase %>/error/ValidationError';

const {
  GENERAL,
} = ERROR_CODE;

async function sampleValidator(sampleRequest) {
  if (!sampleRequest.sampleId) {
    throw new ValidationError(GENERAL);
  }
}

export default sampleValidator;
