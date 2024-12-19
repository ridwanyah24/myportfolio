'use client'
import {useRef} from 'react'
import React from 'react'
import { Provider } from 'react-redux'
import { makeStore, persistor } from "@/store/store";
import { AppStore,  } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'


export const Providers = ({children}: {children: React.ReactNode}) =>{
    return(
        <Provider store={makeStore}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}