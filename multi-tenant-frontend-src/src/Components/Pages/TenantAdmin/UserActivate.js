import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const UserActivate = () => {
  let [searchParams] = useSearchParams();

  const tn = searchParams.get("tn");
  const id = searchParams.get("id");
  const tkPlus = searchParams.get("tk");
  let tk = tkPlus.replace(" ", "+");

  for (let i = 0; i < 10; i++) {
    tk = tk.replace(" ", "+");
  }
  console.log(id, tk);

  const activateUser = async () => {

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `api/app/active-user?id=${id}&token=${tk}`, {},{
        headers: 
        {
          __tenant: tn
        }
      }
    ).then((response) => {
      console.log(response)
      console.log(response.data.message);
    });
    return JSON.stringify(response.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(()=>{
  activateUser();
}, [])


  return (
    <>
      <div>{id}</div>
      <h3>Congratulations!! You have successfully registered. </h3>
      <a href="/">Login</a>
    </>
  );
};
export default UserActivate;
