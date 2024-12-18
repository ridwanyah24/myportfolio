import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/slices/authSlice"
import {request} from "@/app/slices/requestSlice"

export const makeStore = () => {
    return configureStore({
      reducer: {
        auth: authReducer,
        [request.reducerPath]: request.reducer
      },
      middleware: (getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(request.middleware),
    })
  }

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
