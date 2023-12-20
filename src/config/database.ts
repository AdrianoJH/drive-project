// config/database.ts

import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'Adriano',
  password: '06092018',
  database: 'driveProject',
  models: [__dirname + '/models'], // Pasta onde seus modelos estão localizados
  logging: false, // Defina como true para ver logs de consultas SQL
});

export default sequelize;
