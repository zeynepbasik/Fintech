import axios from "axios";
import authHeader from "./auth-header";
const getPublicContent = () => {
  return axios.get(process.env.REACT_APP_API_URL + "api/identity/roles/all");
};
const getUserBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "api/identity/roles/2000", {
    headers: authHeader(),
  });
};
const getAdminBoard = () => {
  return axios.get(
    process.env.REACT_APP_API_URL + "api/identity/roles/{admin}",
    { headers: authHeader() }
  );
};
const getTenantAdminBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "api/identity/roles/2002", {
    headers: authHeader(),
  });
};
const userService = {
  getPublicContent,
  getUserBoard,
  getTenantAdminBoard,
  getAdminBoard,
};
export default userService;
