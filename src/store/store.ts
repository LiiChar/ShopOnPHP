import userReducer from './Slices/setUserSlice';
import { commentsApi } from './Slices/commentApi';
import { configureStore, } from "@reduxjs/toolkit";
import { usersApi } from "./Slices/userApi"
import { productApi } from "./Slices/productApi"
import { busketApi } from './Slices/busketApi';
import { rateApi } from './Slices/rateApi';
import { categoryApi } from './Slices/categoryApi';
import { manufacturerApi } from './Slices/manufacturerApi';


export const store = configureStore({
    reducer: {
        setUser: userReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [busketApi.reducerPath]: busketApi.reducer,
        [rateApi.reducerPath]: rateApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [manufacturerApi.reducerPath]: manufacturerApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware).concat(commentsApi.middleware).concat(productApi.middleware).concat(busketApi.middleware).concat(rateApi.middleware).concat(categoryApi.middleware).concat(manufacturerApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

