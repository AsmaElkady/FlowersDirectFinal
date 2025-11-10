import { baseUrl } from "../../constants/main";
import type { ICustomer } from "./../../types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersAPI = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getAllUsers: build.query<ICustomer[], string>({
      query: () => `/users`,
    }),
    getUserById: build.query<ICustomer, number>({
      query: (id) => "/users?email=" + id,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersAPI;
