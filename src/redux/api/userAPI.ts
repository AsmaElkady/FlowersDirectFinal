import type { ICustomer } from "../../types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants/main";
import axios from "axios";

const UserAPI = "users";

export const getAllUsers = createAsyncThunk("users", async (query?: string) => {
  try {
    const res = await axios.get(baseUrl + UserAPI + (query ? query : ""));
    return res.data;
  } catch (err) {
    return err;
  }
});

export const getUserByID = createAsyncThunk("users/id", async (id: number) => {
  try {
    const res = await axios.get(baseUrl + UserAPI + "/?id=" + id);
    return res.data;
  } catch (err) {
    return err;
  }
});

export const getUserByEmail = createAsyncThunk(
  "users/email",
  async (email: string) => {
    const res = await axios.get(baseUrl + UserAPI + "/?email=" + email);
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (user: Partial<ICustomer>) => {
    const res = await axios.patch(baseUrl + UserAPI + "/" + user.id, user);
    return res.data;
  }
);

export const updateUserPassword = createAsyncThunk(
  "users/updatePassword",
  async ({ id, password }: Pick<ICustomer, "id" | "password">) => {
    const res = await axios.patch(baseUrl + UserAPI + "/" + id, password);
    return res.data;
  }
);

export const removeUser = createAsyncThunk(
  "users/remove",
  async (id: number) => {
    const res = await axios.delete(baseUrl + UserAPI + "/" + id);
    return res.data;
  }
);
