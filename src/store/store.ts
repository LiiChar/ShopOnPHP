import userReducer from './Slices/setUserSlice';
import { commentsApi } from './Slices/commentApi';
import { configureStore,  } from "@reduxjs/toolkit";
import { usersApi } from "./Slices/userApi"
import { productApi } from "./Slices/productApi"
import { busketApi } from './Slices/busketApi';


export const store = configureStore({
    reducer: {
        setUser: userReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [busketApi.reducerPath]: busketApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware).concat(commentsApi.middleware).concat(productApi.middleware).concat(busketApi.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

