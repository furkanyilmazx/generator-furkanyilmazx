import Sequelize from "sequelize";

import { STATUS } from "@<%= appNameUpperCamelCase %>/constants/enums";
import sequelize from "@<%= appNameUpperCamelCase %>/utils/createSequelize";

class BaseModel extends Sequelize.Model {
  static init(attributes, options) {
    return super.init(
      {
        ...attributes,
        status: {
          type: Sequelize.ENUM,
          values: Object.values(STATUS),
          defaultValue: STATUS.PENDING,
          allowNull: false
        }
      },
      {
        sequelize,
        underscored: true,
        paranoid: true,
        ...options
      }
    );
  }
}

export default BaseModel;
