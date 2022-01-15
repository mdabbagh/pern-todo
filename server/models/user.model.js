import pool from "../config/db.js";

export async function getUserByEmail(email) {
  return await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
}

export async function getUserById(id) {
  return await pool.query(
    'SELECT user_id, firstname, lastname, email FROM "user" WHERE user_id = $1',
    [id]
  );
}

export async function createUser(firstname, lastname, email, hashedPassword) {
  return await pool.query(
    'INSERT INTO "user" (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING user_id, firstname, lastname, email',
    [firstname, lastname, email, hashedPassword]
  );
}

export async function updateUserNameAndPassword(
  firstname,
  lastname,
  hashedPassword,
  userId
) {
  return await pool.query(
    'UPDATE "user" SET firstname = $1, lastname = $2, password = $3 WHERE user_id = $4 RETURNING user_id, firstname, lastname, email',
    [firstname, lastname, hashedPassword, userId]
  );
}

export async function updateUserName(firstname, lastname, userId) {
  return await pool.query(
    'UPDATE "user" SET firstname = $1, lastname = $2 WHERE user_id = $3 RETURNING user_id, firstname, lastname, email',
    [firstname, lastname, userId]
  );
}