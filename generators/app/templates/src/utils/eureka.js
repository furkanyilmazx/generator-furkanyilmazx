import Eureka from 'eureka-js-client';

import { getHostIpAddress } from '@<%= appNameUpperCamelCase %>/utils/ipAddress';
import config from '@<%= appNameUpperCamelCase %>/configs/config';

import Logger from '@<%= appNameUpperCamelCase %>/utils/logger';

const logger = Logger.child({ module: 'eureka.js' });

export async function connectToEureka() {
  if (config.env === 'local') return;
  //  TODO: change retrieve ip adress instead of dns
  const ipAddress = await getHostIpAddress();
  logger.info(
    `${config.apiName} will register to: ${JSON.stringify(
      config.eureka.url
    )} zones`
  );
  const client = new Eureka({
    instance: {
      app: config.apiName,
      hostName: ipAddress,
      instanceId: `${ipAddress}:<%= appPackageJsonName %>:${config.appPort}`,
      ipAddr: ipAddress,
      vipAddress: config.apiName,
      secureVipAddress: config.apiName,
      port: {
        $: config.appPort,
        '@enabled': 'true',
      },
      securePort: {
        $: config.appPort,
        '@enabled': 'false',
      },
      statusPageUrl: `https://${ipAddress}:${config.appPort}/info`,
      healthCheckUrl: `https://${ipAddress}:${config.appPort}/health`,
      homePageUrl: `https://${ipAddress}:${config.appPort}/`,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      serviceUrls: {
        default: config.eureka.url,
      },
    },
    logger,
  });

  client.start();
}
