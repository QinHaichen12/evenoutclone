const { Pool } = require("pg");
const pool = require("../config/db.config.js");

const createUser = async (id, email, password, username) => {
  const result = await pool.query(
    "INSERT INTO users (id, email, password, username) VALUES ($1, $2, $3, $4)",
    [id, email, password, username],
  );
  return result;
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const findUserByEmailAndPassword = async (email, password) => {
  const result = await pool.query(
    "SELECT id FROM users WHERE email = $1 AND password = $2",
    [email, password],
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByEmailAndPassword,
};
