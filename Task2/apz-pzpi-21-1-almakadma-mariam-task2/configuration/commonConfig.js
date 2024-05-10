require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('./dbConfig');

module.exports = {
    express,
    router,
    pool,
};
