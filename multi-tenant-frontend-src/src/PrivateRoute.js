import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Login from "./Components/Pages/Login";

const PrivateRoute = ({ Onent }) => {
  const { isLoggedIn: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div>
      {!currentUser ? (
        <>
          <Onent />
        </>
      ) : (
        navigate("/home")
      )}
    </div>
  );
};

export default PrivateRoute;
