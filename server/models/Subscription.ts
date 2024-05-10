import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export class Subscription extends Model<InferAttributes<Subscription>, InferCreationAttributes<Subscription>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare token: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare device?: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId?: number;
}

