// from sample code
import jwtDecode from "jwt-decode";
import http from "./httpService";
import * as config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = apiUrl + "users/";
const tokenKey = "token";

//http.setJwt(getJwt());

export async function login(username, password) {
  console.log("username", username);
  console.log("password", password);
  const { data: jwt } = await http.post(apiEndpoint + "login", {
    username: username,
    password: password,
  });
  console.log(jwt);
  localStorage.setItem(tokenKey, JSON.stringify(jwt));  // Stringify the user object
  console.log('Storing user data:', jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);  // Get the token from local storage
    if (!jwt) return null;  // If the token doesn't exist, return null
    const user = JSON.parse(jwt);  // Parse the user object
    console.log('Retrieved user data:', user);
    return user;
  } catch (ex) {
    return null;  // If an error occurs, return null
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
const exportedMethods = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default exportedMethods;
