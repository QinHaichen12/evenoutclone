require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("Database connected:", res.rows);
  }
});
module.exports = pool;
// module.exports = {
//     HOST: "localhost",
//     USER: "postgres",
//     PASSWORD: "123",
//     DB: "testdb",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
// };

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'evenout',
//   password: '12345678',
//   port: 5432, // default port for PostgreSQL
// });

// module.exports = pool;
