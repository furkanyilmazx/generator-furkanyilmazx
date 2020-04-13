import Sequelize from 'sequelize';

import BaseModel from './BaseModel';

class Sample extends BaseModel {
  static init() {
    return super.init(
      {
        sampleId: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        desc: {
          type: Sequelize.STRING,
        },
      },
      {
        modelName: 'samples',
      }
    );
  }
  static associate(models) {}
}

export default Sample;
