import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface AuthState {
  access_token: string | null;
  isAuthenticated: boolean;
  status: string | null;
}

const initialState: AuthState = {
  access_token: null,
  isAuthenticated: false,
  status: null,
};
  
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, 
      {
        payload: {access_token, status}
      } : PayloadAction<{ access_token: string, status: string }>) => {
      
      state.access_token = access_token;
      state.isAuthenticated = true;
      state.status = status;
    },
    clearAuthData: (state) => {
      state.access_token = null;
      state.isAuthenticated = false;
      state.status = null;
    },
  },
})

export const { setAuthData, clearAuthData } = slice.actions;
export default slice.reducer;

export const selectCurrentUserToken = (state: RootState) => state.auth?.access_token;
export const selectCurrentAuth = (state: RootState) => state.auth?.isAuthenticated;


