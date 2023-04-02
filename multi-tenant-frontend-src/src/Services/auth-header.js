import axios from "axios";

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(process.env.REACT_APP_API_URL + "connect/userinfo", {headers: {
      Authorization: 'Bearer ' + user.access_token,
    },}).then((response) => {
      localStorage.setItem("userinfo", JSON.stringify(response.data))
      return response.data
    })
    // const user = JSON.parse(localStorage.getItem('user'));
    // if (user && user.access_token) {
    //   return { Authorization: 'Bearer ' + user.access_token };
    // } else {
    //   return {};
    // }
  }
  