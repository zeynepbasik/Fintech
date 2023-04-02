import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

export const newsSlide = createSlice({
  name: "news",
  initialState: {
    data: [],
  },
  reducers: {
    setNews: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const getNews = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=tr&apiKey=10a3c5e2d3e54cdf92da1121557532c2"
    );
    console.log("istek atıldı");
    dispatch(setNews(response.data.articles));
  } catch (error) {}
};

const { reducer } = newsSlide;
export default reducer;
export const showNews = (state) => state.news.data;
export const { setNews } = newsSlide.actions;
