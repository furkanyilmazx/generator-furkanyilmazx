import Sample from './Sample';

//import sequelize from '@<%= appNameUpperCamelCase %>/utils/createSequelize';

const entities = {
  Sample: Sample.init(),
};

Object.values(entities)
  .filter((entity) => typeof entity.associate === 'function')
  .forEach((entity) => entity.associate(entities));

// INFO: (furkanyilmazx) PLEASE Don't use entity sync method without local!!!

if (process.env.API_ENV === 'local')
  (async () => {
    /*      await Sample.sync({ force: true });
     */
  })();

export default entities;
