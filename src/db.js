const mysql = require('mysql2/promise');
require('dotenv').config();


async function getConnection () {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_host,
      port: process.env.DB_port,
      user: process.env.DB_user,
      password: process.env.DB_password,
      database: process.env.DB_database,
    });

    await conn.connect();

    return conn;
  }
  catch(error) {
    console.log(error);
    
    return null;
  }
}

module.exports = getConnection;