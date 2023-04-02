import React from "react";
//import { slide as Menu } from "react-burger-menu";
import "./SideBar.css";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@material-ui/core";
import { setTheme } from "../../Store/theme";
import {
  FaHome,
  FaUsers,
  FaSignInAlt,
  FaSignOutAlt,
  FaChartBar,
  FaUserPlus,
  FaUserCheck,
  FaUser,
  FaRegNewspaper,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useEffect } from "react";

const SideBar = ({
  loginfo,
  currentUser,
  currentUserinfo,
  logOut,
  showTenantAdminPage,
  showAdminPage,
  showUserPage,
}) => {
  const dispatch = useDispatch();
  const { themeNow } = useSelector((state) => state.theme);
  const toggleTheme = (curr) => (curr === "light" ? "dark" : "light");
  const hey = toggleTheme(themeNow);
  const onChange = () => {
    dispatch(setTheme(hey));
  };

  const setActive = (e) => {
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((element) => {
      element.classList.remove("selected");
    });

    e.target.classList.add("selected");
  };

  return (
    <div className="menuContainer">
      <img className="logo" src={Logo}></img>
      <div className="switch">
        <Switch onChange={onChange} checked={themeNow === "dark"} />
      </div>
      <ul>
        {!loginfo ? (
          <li className="nav-item">
            <Link to={"/"} className="menu-item" onClick={setActive}>
              <FaSignInAlt className="icons" />
              &nbsp; Login
            </Link>
          </li>
        ) : (
          <></>
        )}
        {!loginfo ? (
          <li className="nav-item">
            <Link to={"/register"} className="menu-item " onClick={setActive}>
              <FaUser className="icons" />
              &nbsp; Register
            </Link>
          </li>
        ) : (
          <></>
        )}
        {currentUser ? (
          <>
            <li className="nav-item">
              <Link to={"/home"} className="menu-item" onClick={setActive}>
                <FaHome className="icons" />
                &nbsp; {currentUserinfo.name}'s Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/news"} className="menu-item" onClick={setActive}>
                <FaRegNewspaper className="icons" />
                &nbsp; News
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {showAdminPage ? (
          <li className="nav-item">
            <Link
              className="menu-item"
              to="/admin/userslist"
              onClick={setActive}
            >
              <FaUserCheck className="icon" />
              &nbsp; Users Check
            </Link>
          </li>
        ) : (
          <div></div>
        )}

        {showUserPage || showTenantAdminPage ? (
          <li className="nav-item">
            <Link className="menu-item" to="/user/charts" onClick={setActive}>
              <FaChartBar className="icons" />
              &nbsp; Charts
            </Link>
          </li>
        ) : (
          <div></div>
        )}
        {showTenantAdminPage ? (
          <>
            <li className="nav-item">
              <Link
                className="menu-item"
                to="/tenantadmin/createUser"
                onClick={setActive}
              >
                <FaUserPlus className="users" />
                &nbsp; Create User
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="menu-item"
                to="/tenantadmin/userList"
                onClick={setActive}
              >
                <FaUsers className="icons" />
                &nbsp;My Employees
              </Link>
            </li>
          </>
        ) : (
          <div></div>
        )}
      </ul>

      {currentUser ? (
        <>
          <div className="settings">
            <Link className="menu-item" to="/settings" onClick={setActive}>
              <FiSettings className="icons" />
              &nbsp; Settings
            </Link>
          </div>
          <div className=" logout">
            <a href="/" className="menu-item" onClick={logOut}>
              <FaSignOutAlt className="icons" />
              &nbsp; LogOut
            </a>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
