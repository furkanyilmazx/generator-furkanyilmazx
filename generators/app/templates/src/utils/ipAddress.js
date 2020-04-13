import dns from 'dns';
import os from 'os';
import util from 'util';

const asyncDnsLookup = util.promisify(dns.lookup);

export async function getHostIpAddress() {
  const hostname = os.hostname();
  const options = {
    family: 4,
    hints: dns.ADDRCONFIG,
  };
  try {
    const { address } = await asyncDnsLookup(hostname, options);
    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
