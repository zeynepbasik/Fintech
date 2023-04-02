import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import messageReducer from "./message";
import themeReducer from "./theme";
import newsReducer from "./newsFeed";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  theme: themeReducer,
  news: newsReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
