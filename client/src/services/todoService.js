import env from "react-dotenv";

import http from "./http";

const baseUrl = `${env.API_URL}/todos`;

// Get todos
export async function getTodos() {
  return http.get(`${baseUrl}`);
}

// Get todo
export async function getTodo() {
  return http.get(`${baseUrl}`);
}

// Update todo
export async function createTodo(description) {
  return http.post(`${baseUrl}`, {
    description: description,
  });
}

// Update todo
export async function updateTodo(description, id) {
  return http.put(`${baseUrl}/${id}`, {
    description: description,
  });
}

// Delete todo
export async function deleteTodo(id) {
  return http.delete(`${baseUrl}/${id}`);
}
