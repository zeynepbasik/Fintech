import { useState, useEffect } from "react";
import axios from "axios";
import { showNews } from "../../Store/newsFeed";
import { useSelector } from "react-redux";

import "./News.scss";
function News() {
  const newsList = useSelector(showNews);

  return (
    <div className=" news-container">
      {newsList?.map((news, index) => (
        <div className="news-card" key={index}>
          <img src={news.urlToImage} alt="haber" />
          <p className="date">{news.publishedAt}</p>
          <h3>{news.title}</h3>
          <p className="desc">{news.description}</p>
          <a href={news.url} target="_blank">
            <button>Devamı➡️</button>
          </a>
        </div>
      ))}
    </div>
  );
}

export default News;
