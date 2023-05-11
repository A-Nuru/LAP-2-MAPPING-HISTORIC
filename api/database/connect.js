const { Pool } = require("pg");

const db = new Pool({
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  connectionString: process.env.DB_URL,
});

console.log("DB connection established.");

module.exports = db;
