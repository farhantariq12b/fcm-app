import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export class UserNotification extends Model<InferAttributes<UserNotification>, InferCreationAttributes<UserNotification>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.JSON)
  @NotNull
  declare data: any;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId?: number;

  @Attribute(DataTypes.DATE)
  declare readAt?: Date | null;
}

