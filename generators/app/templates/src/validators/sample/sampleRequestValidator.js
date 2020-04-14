import ValidationError from '@<%= appNameUpperCamelCase %>/error/ValidationError';

async function sampleValidator(sampleRequest) {
  if (!sampleRequest.sampleId) {
    throw new ValidationError('errors.general');
  }
}

export default sampleValidator;
