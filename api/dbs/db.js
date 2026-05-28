let db = require('./mockdb');

if (process.env.DB_TYPE === 'mongodb') {
    db = require('./mongodb');
}

module.exports = db;

