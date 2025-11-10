import { createSlice } from "@reduxjs/toolkit";
import type { IAuthSlice } from "../../types/auth";
import { updateUser } from "../api/userAPI";

const inialState: IAuthSlice = {
  token: JSON.parse(localStorage.getItem("token")!),
  user: JSON.parse(localStorage.getItem("user")!),
  admin: JSON.parse(localStorage.getItem("admin")!),
  status: "idle",
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: inialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = undefined;
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    logoutAdmin: (state) => {
      state.admin = undefined;
      state.token = "";
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        console.log("checkuseeer");
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("done", action);
        state.status = "success";
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("errr", action);
        state.status = "feild";
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { setToken, setUser, setAdmin, logoutUser, logoutAdmin } =
  authSlice.actions;
