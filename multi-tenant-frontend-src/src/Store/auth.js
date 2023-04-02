// import { createSlice } from "@reduxjs/toolkit";

// export const auth = createSlice({
//     name: 'auth',
//     initialState: {
//         user: false
//     },
//     reducers: {
//         login: state => {
//             state.user = true
//         },
//         logout: state => {
//             state.user = false
//         }
//     }
// })

// export const { login, logout } = auth.actions

// export default auth.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userinfo from "../Services/auth-header";
import AuthService from "../Services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (props, thunkAPI) => {
    console.log(props.urlencoded);
    console.log(props.company);
    try {
      const data = await AuthService.login(props);
      const userinfodata = await userinfo();
      return { user: data, userinfo: userinfodata };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userdata, thunkAPI) => {
    console.log(userdata);
    try {
      const data = await AuthService.register(userdata);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const updateThunk = createAsyncThunk(
  "auth/update",
  async (userdata, thunkAPI) => {
    try {
      const data = await AuthService.update(userdata);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerThunk.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerThunk.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [loginThunk.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userinfo = null;
    },
  },
});
const { reducer } = authSlice;

export default reducer;
