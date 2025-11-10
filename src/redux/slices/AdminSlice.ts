import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  updateUser,
  updateUserPassword,
  getUserByEmail,
  removeUser,
} from "../api/userAPI";

const initialState = {
  users: [],
  status: "idle",
  isError: false,
  isLoading: false,
  error: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = "feild";
        state.isLoading = false;
        state.isError = true;
        //state.error = action.payload;
      })
      .addCase(getUserByEmail.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        console.log("errr", action);
        state.status = "feild";
        state.isError = true;
        //state.error = action.error
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("done", action);
        state.status = "success";
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("errr", action);
        state.status = "feild";
        state.isError = true;
        state.isLoading = false;
        //state.error = action.error
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        console.log("done", action);
        state.status = "success";
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        console.log("errr", action);
        state.status = "feild";
        state.isError = true;
        state.isLoading = false;
        //state.error = action.error
      })
      .addCase(removeUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        console.log("done", action);
        state.status = "success";
        state.isLoading = false;
      })
      .addCase(removeUser.rejected, (state, action) => {
        console.log("errr", action);
        state.status = "feild";
        state.isError = true;
        state.isLoading = false;
        //state.error = action.error
      });
  },
});

export default adminSlice.reducer;
