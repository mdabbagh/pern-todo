import pool from "../config/db.js";

export async function getTodos(userId) {
  return await pool.query("SELECT * FROM todo WHERE user_id = $1", [userId]);
}

export async function createTodo(userId, description) {
  return await pool.query(
    "INSERT INTO todo (user_id, description) VALUES($1, $2) RETURNING *",
    [userId, description]
  );
}

export async function getTodo(todoId, userId) {
  return pool.query("SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2", [
    todoId,
    userId,
  ]);
}

export async function updateTodo(description, todoId, userId) {
  return pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
    [description, todoId, userId]
  );
}

export async function deleteTodo(todoId, userId) {
  return pool.query(
    "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *",
    [todoId, userId]
  );
}
