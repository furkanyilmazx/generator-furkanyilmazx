function SampleResponse(sampleDTO) {
  return {
    name: sampleDTO.sampleName,
    description: sampleDTO.sampleDescription,
  };
}

export default SampleResponse;
