import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { login } from "../../Store/auth";
import { clearMessage } from "../../Store/message";
import { loginThunk } from "../../Store/auth";
import ReCAPTCHA from "react-google-recaptcha";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    password: "",
    company: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    if (isValidate) {
      const urlencoded = new URLSearchParams();
      const { username, password, company } = formValue;
      setLoading(true);
      localStorage.setItem("CompanyName", company);

      urlencoded.append("client_id", "multi_tenant_simulation_backend_App");
      urlencoded.append("grant_type", "password");
      urlencoded.append("username", username);
      urlencoded.append("password", password);

      dispatch(loginThunk({ urlencoded, company }))
        .unwrap()
        .then(() => {
          navigate("/home");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      alert("Please validate");
    }
  };
  if (isLoggedIn) {
    return navigate("/home");
  }

  const reCaptchaChange = () => {
    setIsValidate(true);
  };
  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <Field name="company" type="text" className="form-control" />
              <ErrorMessage
                name="company"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <ReCAPTCHA
                className="recaptcha"
                sitekey="6LdzL5ohAAAAABM7zFSoP_gtrr4nOnCyD3Q0DahR"
                onChange={reCaptchaChange}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
