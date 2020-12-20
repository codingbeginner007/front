import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (name, username, email, password, role) => {
  name = name.toLowerCase();
  username = username.toLowerCase();


  return (role === 0) ?
    axios.post(API_URL + "signup/1", {
      name,
      username,
      email,
      password,
    }) :
    axios.post(API_URL + "signup/3", {
      name,
      username,
      email,
      password,
    });
};

const login = (usernameOrEmail, password) => {
  return axios
    .post(API_URL + "signin", {
      usernameOrEmail,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
}

export default AuthService;