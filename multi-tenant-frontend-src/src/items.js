import TenantAdmin from "./Components/Pages/TenantAdmin/TenantAdmin";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Home from "./Components/Pages/Home";
import User from "./Components/Pages/User/User";
import Admin from "./Components/Pages/Admin/Admin";

export const items = [
    {
        path: '/',
        name: 'Login',
        Element: <Login />,
        auth: false
    },
    {
        path: "/register",
        name: 'Register Page',
        Element: <Register />,
        auth: false
    },
    {
        path: "/home",
        name: 'Home Page',
        Element: <Home />,
        auth: true
    },
    {
        path: "/user",
        name: "User's Page",
        Element: <User />,
        auth: true
    },
    {
        path: "/admin",
        name: "Admin's Page",
        Element: <Admin />,
        auth: true
    },
    {
        path: "/tenant-admin",
        name: "Tenant's Admin's Page",
        Element: <TenantAdmin />,
        auth: true
    }

]