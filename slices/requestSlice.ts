import { RootState } from "../store/store";

import {
    BaseQueryFn,  
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ApiResponse, AuthResponse } from "../types/authtype";
import { useRouter } from "next/navigation";

import { clearAuthData, setAuthData, } from "./authSlice";
import { clearCookie, createCookie } from "../app/utils/cookies";

const newBaseQuery = fetchBaseQuery({
    baseUrl: " https://ridwanyahya-portfolio.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token;
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
  let result = await newBaseQuery(args, api, extraOptions);
  // If access token has expired (401 error)
  if (result.error && result.error.status === 401) {
    console.log("Access token expired, attempting to refresh");
    
    api.dispatch(clearAuthData()); // Logout if refresh fails
    const router = useRouter();
    router.push("/auth");
    
    // Attempt to refresh the access token
    // const refreshResult = await newBaseQuery(
    //   {
    //     url: "/login", // Your refresh token endpoint
    //     credentials: "include", // Include the refresh token cookie
    //     method: "GET",
    //   },
    //   api,
    //   extraOptions
    // );
    // console.log(refreshResult);

    // if (refreshResult.data) {
    //   const { access_token, user } = refreshResult.data as {
    //     access_token: string;
    //     user: AuthResponse;
    //   };
    //   createCookie("accessToken", access_token, {
    //     path: "/",
    //     expires: 7,
    //     secure: true,
    //   });
    //   // Dispatch action to set new credentials
    //   api.dispatch(
    //     setAuthData({
    //       // Update user if returned, otherwise retain current user
    //       access_token,// Update the access token
    //       status: "success"
    //     })
    //   );
    //   // Retry the original query with the new access token
    //   result = await newBaseQuery(args, api, extraOptions);
    // } else if (refreshResult.error) {
    //   console.log("Refresh token failed, logging out");
    //   api.dispatch(clearAuthData()); // Logout if refresh fails
    //   clearCookie("accessToken");
    //   clearCookie("role");
    // }
  }
  return result;
};

export const request = createApi({
  reducerPath: "request",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) =>({
    login: builder.mutation<ApiResponse, any>({
      query(body){
        return{
          url: '/login',
          method: "POST",
          credentials: "include",
          body,
        }
      }
    }),
    addProject: builder.mutation<any, any>({
      query(body){
        return{
          url: "/projects",
          method:"POST",
          body,
        }
      }
    }),
    addCompany: builder.mutation<any, any>({
      query(body){
        return{
          url: "/companies",
          method: "POST",
          body,
        }
      }
    })
  })
})



export const {
  useLoginMutation,
  useAddCompanyMutation,
  useAddProjectMutation,
} = request