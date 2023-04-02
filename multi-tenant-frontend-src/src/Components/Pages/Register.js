import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../Store/message";
import { registerThunk } from "../../Store/auth";
import authService from "../../Services/auth.service";

import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  //const [successful, setSuccessful] = useState(false);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    phoneNumber: Yup.string().required("This field is required!"),
  });
  const handleRegister = (formValue) => {
    if (isValidate) {
      const { username, email, phoneNumber, password } = formValue;
      console.log(formValue);
      setLoading(true);
      const reg = {
        appName: "multi_tenant_simulation_backend_App",
        emailAddress: email,
        phoneNumber: phoneNumber,
        userName: username,
        password: password,
      };

      dispatch(registerThunk(reg))
        .unwrap()
        .then(() => {
          navigate("/");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      alert("Please validate");
    }
  };
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
          onSubmit={handleRegister}
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
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone number</label>
              <Field name="phoneNumber" type="text" className="form-control" />
              <ErrorMessage
                name="phoneNumber"
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
                style={{ marginTop: "0.4bencm" }}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Register</span>
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
}

export default Register;
