// name: Kevin, Matt, Aaryan, Camryn
// service that allows the user to register
import http from "./httpService";
import * as config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "users/login/register";

// register user - automatically set to student role based on requirements
export function register(user) {
  return http.post(apiEndpoint, {
    firstName: user.firstname,
    lastName: user.lastname, 
    username: user.username,
    password: user.password,
    role: "student"
  });
}

