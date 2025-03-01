import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import { User } from '../models/User';
import { UserNotification } from '../models/UserNotification';
import { Subscription } from '../models/Subscription';

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: 'sequelize.sqlite',
  logging: console.log,
  models: [User, UserNotification, Subscription],
});

export default sequelize;