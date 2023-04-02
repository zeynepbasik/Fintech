import "./Settings.scss";
import {
  AiOutlineInfoCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

import { authorization } from "../DefaultAxios";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect, useRef } from "react";

function Settings() {
  const [passwordShow, setPasswordShow] = useState({
    currentPassword: "password",
    newPassword: "password",
    newPassword2: "password",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const body = {
    currentPassword: passwordInfo.currentPassword,
    newPassword: passwordInfo.newPassword,
  };

  const onChange = (e) => {
    setPasswordInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (passwordInfo.newPassword === passwordInfo.newPassword2) {
      try {
        await authorization.post(
          "api/account/my-profile/change-password",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPasswordInfo({
          ...passwordInfo,
          currentPassword: "",
          newPassword: "",
          newPassword2: "",
        });
        toast.success("Password is successfuly changed✌️", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {}
    } else {
      toast.error("New passwords not matching😵‍💫", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const passwordShowChange = (inputName) => {
    if (inputName === "currentPassword") {
      const button = document.querySelector("#eye-button1");
      if (passwordShow.currentPassword === "password") {
        setPasswordShow({ ...passwordShow, currentPassword: "text" });
        button.innerHTML = ReactDOMServer.renderToString(
          <AiOutlineEyeInvisible />
        );
      } else {
        setPasswordShow({ ...passwordShow, currentPassword: "password" });
        button.innerHTML = ReactDOMServer.renderToString(<AiOutlineEye />);
      }
    }
    if (inputName === "newPassword") {
      const button = document.querySelector("#eye-button2");
      if (passwordShow.newPassword === "password") {
        setPasswordShow({ ...passwordShow, newPassword: "text" });
      } else {
        setPasswordShow({ ...passwordShow, newPassword: "password" });
      }
    }
    if (inputName === "newPassword2") {
      const button = document.querySelector("#eye-button3");
      if (passwordShow.newPassword2 === "password") {
        setPasswordShow({ ...passwordShow, newPassword2: "text" });
      } else {
        setPasswordShow({ ...passwordShow, newPassword2: "password" });
      }
    }
  };
  const [userInfoList, setUserInfoList] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    phonenumber: "",
  });
  const getProfile = async () => {
    try {
      const response = await authorization.get(
        "api/account/my-profile",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data;
      setUserInfoList({
        ...userInfoList,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.userName,
        phonenumber: user.phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [sendInfo, setSendInfo] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    phonenumber: "",
  });

  //Oğuz beye bunları sorucaz. use effect ve refresh olayı
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setSendInfo({
      name: userInfoList.name,
      surname: userInfoList.surname,
      email: userInfoList.email,
      username: userInfoList.username,
      phonenumber: userInfoList.phonenumber,
    });
  }, [userInfoList]);

  const myProfile = useRef();
  const myProfileForm = useRef();

  const userInfoBody = {
    userName: sendInfo.username,
    email: sendInfo.email,
    name: sendInfo.name,
    surname: sendInfo.surname,
    phoneNumber: sendInfo.phonenumber,
    concurrencyStamp: "",
  };

  const profileFormChange = (e) => {
    setSendInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleMyProfileEdit = () => {
    myProfile.current.classList.toggle("hidden");
    myProfileForm.current.classList.toggle("hidden");
  };

  const editUserInfo = async (e) => {
    e.preventDefault();
    try {
      await authorization.put("api/account/my-profile", userInfoBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="change-form">
          <div className=" user-info profile-card " ref={myProfile}>
            <h4>My Profile</h4>
            <div className="info-row">
              <span>Name: {userInfoList.name}</span>
              <span>Surname: {userInfoList.surname}</span>
            </div>
            <div className="info-row">
              <span>Username: {userInfoList.username}</span>
              <span>Email: {userInfoList.email}</span>
            </div>
            <div className="info-row">
              <span>Phone Number: {userInfoList.phonenumber}</span>
            </div>
            <button id="edit-button" onClick={handleMyProfileEdit}>
              <BsPencil />
            </button>
          </div>
          <form
            className="user-info profile-card hidden"
            ref={myProfileForm}
            onSubmit={editUserInfo}
          >
            <h4>My Profile</h4>
            <div className="info-row">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  defaultValue={userInfoList.name}
                  onChange={profileFormChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="surname">Surname:</label>
                <input
                  type="text"
                  defaultValue={userInfoList.surname}
                  onChange={profileFormChange}
                  name="surname"
                />
              </div>
            </div>
            <div className="info-row">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  defaultValue={userInfoList.username}
                  onChange={profileFormChange}
                  name="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  defaultValue={userInfoList.email}
                  onChange={profileFormChange}
                  name="email"
                />
              </div>
            </div>
            <div className="info-row">
              <div className="form-group phone">
                <label htmlFor="phonenumber">Phone Number:</label>
                <input
                  type="text"
                  defaultValue={userInfoList.phonenumber}
                  onChange={profileFormChange}
                  name="phonenumber"
                />
              </div>
            </div>
            <div className="info-row">
              <button id="submit-edit" type="submit">
                Submit
              </button>
              <button
                id="edit-button"
                type="button"
                onClick={handleMyProfileEdit}
              >
                <BsPencil />
              </button>
            </div>
          </form>

          <form className="profile-card" onSubmit={onSubmitPassword}>
            <h4>Change Password</h4>
            <label htmlFor="old-password">Current Password</label>
            <div className="input-group">
              <input
                type={passwordShow.currentPassword}
                name="currentPassword"
                id="old-password"
                placeholder="Current Password "
                onChange={onChange}
                value={passwordInfo.currentPassword}
              />
              <button
                id="eye-button1"
                onClick={() => {
                  passwordShowChange("currentPassword");
                }}
                type="button"
              >
                <AiOutlineEye />
              </button>
            </div>

            <label htmlFor="new-password1">
              New Password
              <AiOutlineInfoCircle
                className="i-button"
                data-tip
                data-for="passwordTip"
              />
            </label>
            <div className="input-group">
              <input
                type={passwordShow.newPassword}
                name="newPassword"
                id="new-password1"
                placeholder="New Password"
                onChange={onChange}
                value={passwordInfo.newPassword}
              />
              <button
                id="eye-button2"
                onClick={() => {
                  passwordShowChange("newPassword");
                }}
                type="button"
              >
                <AiOutlineEye />
              </button>
            </div>
            <label htmlFor="new-password2">
              New password again
              <AiOutlineInfoCircle
                className="i-button"
                data-tip
                data-for="passwordTip"
              />
            </label>
            <div className="input-group">
              <input
                type={passwordShow.newPassword2}
                name="newPassword2"
                id="new-password2"
                placeholder="New Password"
                onChange={onChange}
                value={passwordInfo.newPassword2}
              />
              <button
                id="eye-button3"
                onClick={() => {
                  passwordShowChange("newPassword2");
                }}
                type="button"
              >
                <AiOutlineEye />
              </button>
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div className="changeForm"></div>
      </div>
      <ReactTooltip id="passwordTip" place="top" effect="solid">
        At least 7 character(must contain one uppercasea and one lowercase
        letter,one symbol and one number)
      </ReactTooltip>
    </>
  );
}

export default Settings;
{
  /* <form>
            <h4>Change Username</h4>
            <label htmlFor="username">New Username</label>
            <input
              type="text"
              name="username"
              id="change-username"
              placeholder="Username"
            />
            <button>Submit</button>
          </form> */
}
