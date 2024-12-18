import { RootState } from "../../store/store";

import {
    BaseQueryFn,  
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ApiResponse, AuthResponse } from "../types/authtype";

import { logout, setCredentials, } from "./authSlice";
import { clearCookie, createCookie } from "../utils/cookies";


const baseQuery = fetchBaseQuery({
    baseUrl: " https://ridwanyahya-portfolio.onrender.com//api/v2",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // If access token has expired (401 error)
  if (result.error && result.error.status === 401) {
    console.log("Access token expired, attempting to refresh");

    // Attempt to refresh the access token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh", // Your refresh token endpoint
        credentials: "include", // Include the refresh token cookie
        method: "GET",
      },
      api,
      extraOptions
    );
    console.log(refreshResult);

    if (refreshResult.data) {
      const { accessToken, user } = refreshResult.data as {
        accessToken: string;
        user: AuthResponse;
      };
      createCookie("accessToken", accessToken, {
        path: "/",
        expires: 7,
        secure: true,
      });
      // Dispatch action to set new credentials
      api.dispatch(
        setCredentials({
          user, // Update user if returned, otherwise retain current user
          accessToken, // Update the access token
          isAuth: true,
        })
      );
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult.error) {
      console.log("Refresh token failed, logging out");
      api.dispatch(logout()); // Logout if refresh fails
      clearCookie("accessToken");
      clearCookie("role");
    }
  }
  return result;
};

export const request = createApi({
  reducerPath: "request",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) =>({
    login: builder.mutation<ApiResponse, Partial<AuthResponse>>({
      query(body){
        return{
          url: '/login',
          method: "POST",
          credentials: "include",
          body,
        }
      }
    }),
    
  })
})



export const {
  useLoginMutation
} = request