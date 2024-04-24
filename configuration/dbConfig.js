require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'PerformMentor',
    'postgres',
    '2022pAss',
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

module.exports = sequelize;

/*
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
);

module.exports = sequelize;
 */