import React, { createContext, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Pages/Login";
import Home from "./Components/Pages/Home";
import User from "./Components/Pages/User/User";
import TenantAdmin from "./Components/Pages/TenantAdmin/TenantAdmin";
import { logoutThunk } from "./Store/auth";
import EventBus from "./EventBus";
import PrivateRoute from "./PrivateRoute";
import Register from "./Components/Pages/Register";
import UsersList from "./Components/Pages/Admin/UsersList";
import UserSelfRegister from "./Components/Pages/Admin/UserSelfRegister";
import Header from "./Components/header/Header";
import ChartsPage from "./Components/Charts/ChartsPage";
import CreateUser from "./Components/Pages/TenantAdmin/createUser";
import UserListTenant from "./Components/Pages/TenantAdmin/UserListTenant";
import SideBar from "./Components/SideBar/SideBar";
import UserActivate from "./Components/Pages/TenantAdmin/UserActivate";
import Settings from "./Components/Pages/Settings";
import News from "./Components/Pages/News";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNews } from "./Store/newsFeed";
import axios from "axios";

export const ThemeContext = createContext(null);

//import { json } from "stream/consumers";
const App = () => {
  const [showTenantAdminPage, setShowTenantAdminPage] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn: loginfo } = useSelector((state) => state.auth);
  const currentUserinfo = JSON.parse(localStorage.getItem("userinfo"));
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowUserPage(currentUserinfo.role === "user");
      setShowTenantAdminPage(currentUserinfo.role === "Company Admin");
      setShowAdminPage(currentUserinfo.role === "admin");
    } else {
      setShowTenantAdminPage(false);
      setShowAdminPage(false);
      setShowUserPage(false);
    }
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  const { themeNow } = useSelector((state) => state.theme);

  const [rateList, setRateList] = useState([]);

  const getRates = async () => {
    try {
      const res = await axios.get(
        "https://api.apilayer.com/exchangerates_data/latest?symbols=EUR%2CUSD%2CGBP%2CCAD&base=TRY",
        {
          headers: {
            apikey: "s7HybjrggD5DDnuDhrDcU6r1UyKH8dj7",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("istek atıldı");
      const { rates } = res.data;
      const ratesTemp = [];
      for (const [symbol, rate] of Object.entries(rates)) {
        ratesTemp.push({ symbol, rate });
      }
      setRateList(ratesTemp);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getRates();
    dispatch(getNews());
  }, []);

  return (
    <Router>
      <ThemeContext.Provider value={{ themeNow }}>
        <div id={themeNow} className="page">
          <SideBar
            loginfo={loginfo}
            currentUser={currentUser}
            currentUserinfo={currentUserinfo}
            logOut={logOut}
            showTenantAdminPage={showTenantAdminPage}
            showAdminPage={showAdminPage}
            showUserPage={showUserPage}
          />
          <div className="container mt-3 content">
            <Routes>
              <>
                <Route path="/" element={<PrivateRoute Onent={Login} />} />
              </>
              <Route
                exact
                path="/home"
                element={<Home rateList={rateList} />}
              />
              <>
                <Route
                  path="/register"
                  element={<PrivateRoute Onent={Register} />}
                />
              </>
              <Route
                exact
                path="/activate-account"
                element={<UserActivate />}
              />

              <Route exact path="/create-user" element={<UserSelfRegister />} />
              <Route
                exact
                path="/tenantadmin/createuser"
                element={<CreateUser />}
              />
              {currentUser ? (
                <>
                  {currentUserinfo.role === "admin" ? (
                    <>
                      <Route path="admin/userslist" element={<UsersList />} />
                    </>
                  ) : (
                    <Route element={() => <Navigate to="/" />} />
                  )}
                  {currentUserinfo.role === "user" ||
                  currentUserinfo.role === "Company Admin" ? (
                    <>
                      <Route
                        path="user/charts"
                        element={<ChartsPage rateList={rateList} />}
                      />
                    </>
                  ) : (
                    <Route element={() => <Navigate to="/" />} />
                  )}
                  {currentUserinfo.role === "Company Admin" ? (
                    <>
                      <Route
                        path="tenantadmin/userList"
                        element={<UserListTenant />}
                      />
                    </>
                  ) : (
                    <Route element={() => <Navigate to="/" />} />
                  )}
                  {loginfo ? (
                    <Route path="/settings" element={<Settings />} />
                  ) : (
                    <></>
                  )}
                  {loginfo && <Route path="/news" element={<News />} />}
                </>
              ) : (
                <></>
              )}
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
      <ToastContainer />
    </Router>
  );
};

export default App;
