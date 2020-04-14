function SampleRequest(req) {
  return {
    sampleId: req.query.sampleId,
  };
}

export default SampleRequest;
