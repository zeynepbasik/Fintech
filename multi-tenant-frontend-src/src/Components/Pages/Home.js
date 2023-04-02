import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showNews } from "../../Store/newsFeed";
import "./Home.scss";

import { IoLogoUsd, IoLogoEuro } from "react-icons/io";

const Home = ({ rateList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const newsList = useSelector(showNews);

  useEffect(() => {
    if (!currentUser) {
      return navigate("/");
    }
  });

  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  let userrole = userinfo.role;
  let text1 = (
    <Link to="/admin" style={{ color: "red" }}>
      {userrole}
    </Link>
  );
  let text2 = userrole;
  let text3 = userrole;
  let text = userrole;

  if (userrole === "admin") {
    text = text1;
  } else if (userrole === "tenantadmin") {
    text = text2;
  } else {
    text = text3;
  }

  var eurCur = rateList?.find((currency) => currency.symbol === "EUR");
  console.log(rateList);
  var usdCur = rateList.find((currency) => currency.symbol === "USD");

  return (
    <div className="container">
      <header className="header-card">
        <div className="news">
          {newsList.slice(0, 3).map((each, index) => (
            <div key={index} className="news-card-home" id={"a" + index}>
              <h4>{each.title}</h4>
              <p>{each.description}</p>
              <a href={each.url}>Devamı...</a>
            </div>
          ))}
        </div>
        <div className="exchange">
          <span>
            <IoLogoEuro size={24} /> : {(1 / rateList[0]?.rate)?.toFixed(2)} TL
          </span>
          <span>
            <IoLogoUsd size={24} /> : {(1 / rateList[1]?.rate)?.toFixed(2)} TL
          </span>
        </div>
      </header>
      <div className="bottom-part">
        <div className="cont">
          <h5>Welcome Home {userinfo.name} !</h5>
          <strong>Authorities:</strong>
          <ul>
            <li>{userrole}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Home;
