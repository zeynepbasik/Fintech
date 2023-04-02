import React from "react";
import SideBar from "../SideBar/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@material-ui/core";
import { setTheme } from "../../Store/theme";

function Header({
  loginfo,
  currentUser,
  currentUserinfo,
  logOut,
  showTenantAdminPage,
  showAdminPage,
  showUserPage,
}) {
  const showap = showAdminPage;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { themeNow } = useSelector((state) => state.theme);

  const toggleTheme = (curr) => (curr === "light" ? "dark" : "light");
  const hey = toggleTheme(themeNow);

  const onChange = () => {
    dispatch(setTheme(hey));
  };

  return (
    console.log(showap),
    (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div>
          <li>
            <SideBar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
              style={{ backgroundcolor: "white" }}
              loginfo={loginfo}
              currentUser={currentUser}
              currentUserinfo={currentUserinfo}
              logOut={logOut}
              showTenantAdminPage={showTenantAdminPage}
              showAdminPage={showap}
              showUserPage={showUserPage}
            />
          </li>
        </div>
        <div>
          <li>
            {!loginfo ? (
              <Link
                to={"/"}
                className="navbar-brand"
                style={{ marginLeft: "1.3cm", color: "white" }}
              >
                Login
              </Link>
            ) : (
              <></>
            )}
          </li>
        </div>
        <div className="navbar-nav mr-auto"></div>
        <div className="navbar-nav mr-auto">
          {!loginfo ? (
            <li className="nav-item">
              <Link
                to={"/register"}
                className="nav-link"
                style={{ fontSize: "26px", color: "white" }}
              >
                Register
              </Link>
            </li>
          ) : (
            <></>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to={"/home"}
                className="nav-link"
                style={{
                  fontSize: "26px",
                  color: "white",
                  marginLeft: "1.3cm",
                }}
              >
                {currentUserinfo.name}'s Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
                onClick={logOut}
                style={{ fontSize: "26px", color: "white" }}
              >
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <></>
        )}
        <div className="switch ms-auto">
          <Switch onChange={onChange} checked={themeNow === "dark"} />
        </div>
      </nav>
    )
  );
}

export default Header;
