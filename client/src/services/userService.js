import http from "../http";
import env from "react-dotenv";

const baseUrl = `${env.API_URL}/users`;

// Edit user
export async function updateUser(data, id) {
  const { firstname, lastname, password } = data;
  const userId = id;

  return http.put(`${baseUrl}/${userId}`, {
    firstname: firstname,
    lastname: lastname,
    password: password,
  });
}
