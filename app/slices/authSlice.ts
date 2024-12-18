import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../types/authtype";
import { RootState } from "../../store/store";


type AuthState = {
    user: AuthResponse | null;
    accessToken: string | null;
    isAuth: boolean;
  };

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuth: false,
  };

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken, isAuth },
      }: PayloadAction<{ user: AuthResponse; accessToken: string; isAuth: boolean }>
    ) => {
      state.user = user
      state.accessToken = accessToken;
      state.isAuth = isAuth;
    },
    updateCurrentUser: (state, { payload }: PayloadAction<AuthResponse>) => {
      state.user= payload;
    },
    logout: (state) => {
      // Reset the state to the initial values
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
    },
  },
})

export const { setCredentials, logout, updateCurrentUser } = slice.actions;
export default slice.reducer;

export const selectCurrentUserIsAuth = (state: RootState) => state.auth.isAuth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUserEmail = (state: RootState)=> state.auth.user?.email;


