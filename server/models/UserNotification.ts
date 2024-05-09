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

  @Attribute(DataTypes.STRING)
  @NotNull
  declare data: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId?: number;
}

