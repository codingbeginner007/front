import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getApiState = () => {
  return axios.get(API_URL + "hello");
}

const getUserData = () => {
  return axios.get(API_URL + "api/profile", { headers: authHeader() });
}
const UserService = {
  getApiState,
  getUserData
}
export default UserService;