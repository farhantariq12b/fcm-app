import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany } from '@sequelize/core/decorators-legacy';
import { UserNotification } from './UserNotification';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @NotNull
  @Attribute(DataTypes.STRING)
  declare email: string;

  @NotNull
  @Attribute(DataTypes.STRING)
  declare password: string;

  @Attribute(DataTypes.STRING)
  declare accessToken: string | null;

  @Attribute(DataTypes.STRING)
  declare refreshToken: string | null;

  @HasMany(() => UserNotification, /* foreign key */ 'userId')
  declare notifications?: NonAttribute<UserNotification[]>;
}

