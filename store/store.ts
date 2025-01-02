import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice"
import {request} from "@/slices/requestSlice"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"


const reducers = combineReducers({
  auth: authReducer,
  [request.reducerPath]: request.reducer,
})

const persistConfig = {
key: "root",
storage,
whiteList: ["auth"],
blacklist: [request.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const makeStore = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleWare)=>
    getDefaultMiddleWare({serializableCheck: false,}).concat(request.middleware),
})
  



export type AppStore = ReturnType<typeof makeStore.getState>;

export type RootState =  ReturnType<typeof makeStore.getState>
export type AppDispatch = typeof makeStore.dispatch;

export const persistor = persistStore(makeStore);
