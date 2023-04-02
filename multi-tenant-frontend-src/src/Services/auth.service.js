import axios from "axios";

const register = (reg) => {
  console.log(reg);
  return axios
    .post(process.env.REACT_APP_API_URL + "api/test/register", reg, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = (props) => {
  console.log(props);
  return axios
    .post(process.env.REACT_APP_API_URL + "connect/token", props.urlencoded, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        __tenant: props.company,
      },
    })
    .then((response) => {
      console.log(response?.data);
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }
      return response.status;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userinfo");
  localStorage.removeItem("CompanyName");
};

const update = (body) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL +
        "api/app/inactive-user-management/update-inactive-user",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response?.status);
      console.log(response?.data);
      return (response?.data);
    });
};

const authService = {
  register,
  login,
  logout,
  update,
};
export default authService;
