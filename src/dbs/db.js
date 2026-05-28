let db = require('./mockdb');

if (process.env.DB_TYPE === 'mongodb') {
    db = require('./mongodb');
    console.log('Using MongoDB database');
}

module.exports = db;

