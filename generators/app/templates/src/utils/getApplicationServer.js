import https from 'https';

import config from '@<%= appNameUpperCamelCase %>/configs/config';

const { ssl } = config;

function getApplicationServer(app) {
  if (ssl.enabled) {
    return https.createServer(
      {
        key: ssl.keyFile,
        cert: ssl.certFile,
        passphrase: ssl.passpharase,
      },
      app
    );
  } else {
    return app;
  }
}

export default getApplicationServer;
