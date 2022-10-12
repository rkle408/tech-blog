const Sequelize = require('sequelize');

// Refer to .env file:
require('dotenv').config();

// Set up Sequelize:
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // Object for host:
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;