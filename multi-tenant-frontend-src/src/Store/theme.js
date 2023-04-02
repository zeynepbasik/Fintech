import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  themeNow: "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      return { themeNow: action.payload };
    },
  },
});
const { reducer, actions } = themeSlice;
export const { setTheme } = actions;
export default reducer;
