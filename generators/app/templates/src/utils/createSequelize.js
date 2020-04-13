import Sequelize from 'sequelize';
import pg from 'pg';

import config from '@<%= appNameUpperCamelCase %>/configs/config';
import Logger from '@<%= appNameUpperCamelCase %>/utils/logger';

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.url,
    dialect: 'postgres',
    dialectModule: pg,
    logging: config.debugMode === 'enabled' ? Logger.debug.bind(Logger) : false,
    benchmark: config.debugMode === 'enabled',
  }
);

export default sequelize;
