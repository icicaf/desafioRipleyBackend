const dotenv = require('dotenv');
const mysql = require('mysql');
const { promisify } = require('util');

dotenv.config({path: './config/config.env'});

const configDatabase = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
};

const poolDatabase = mysql.createPool(configDatabase);

poolDatabase.getConnection(function(err, connection) {
    if(err) {
       console.error('Error DB', err.code);
    }

    if(connection) {
        connection.release();
        console.log('DB Connected');
    }
});

poolDatabase.query = promisify(poolDatabase.query);

module.exports = poolDatabase;