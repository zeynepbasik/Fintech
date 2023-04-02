import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Formik, Form, Field } from "formik";

const UserSelfRegister = () => {
  let [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const tn = searchParams.get("tn");
  const id = searchParams.get("id");
  const tkPlus = searchParams.get("tk");
  let tk = tkPlus.replace(" ", "+");

  for (let i = 0; i < 10; i++) {
    tk = tk.replace(" ", "+");
  }

  const passwordValidation = () => {};

  const handlePasswordReset = async (event, props) => {
    const body = {
      userId: id,
      resetToken: tk,
      password: event.password,
    };

    try {
      const response = await axios
        .post(
          process.env.REACT_APP_API_URL + "api/account/reset-password",
          body,
          {
            headers: {
              "Content-Type": "application/json",
              __tenant: tn,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(response.data.message);
          navigate("/");
        });
      return JSON.stringify(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>{id}</div>
      <div>{tk}</div>
      <Box>
        <Formik
          initialValues={{ password: "", confirmPassword: "", id, tk }}
          // validationSchema={passwordValidation}
          onSubmit={handlePasswordReset}
        >
          <Form>
            <label>Password</label>
            <Field
              id="password"
              name="password"
              placeholder="New Password"
              type="password"
            />
            <label>Confirm Password</label>
            <Field
              id="confirm password"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            <button type="submit">Create Account Password</button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};
export default UserSelfRegister;
