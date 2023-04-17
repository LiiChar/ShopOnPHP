
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnyIfEmpty } from 'react-redux';

interface IAddUser {
    username: string;
    password: string;
    email: string;
}

interface LoginUser {
    username: string | null;
    password: string;
    email: string | null;
}

interface userReq {
    user_id: number;
    user: string
}

const baseUrl = 'http://localhost:80/'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUserById: build.query<any, any>({
            query: (id) => ({
                url: `/users/one?id=${id}`
            }),
            providesTags: result => ['Users']
        }),
        getNameByToken: build.mutation<any, any>({
            query: () => ({
                url: '/auth/name',
                method: 'POST',
                headers: {authorization: JSON.parse(sessionStorage.getItem('token') || '')}
            }),
            invalidatesTags: ['Users']
        }),
        getNameByName: build.query<any, string>({
            query: (username) => ({
                url: `/users/name/${username}`,
            }),
            providesTags: result => ['Users']
        }),
        getImageByName: build.query<any, any>({
            query: (username) => ({
                url: `/users/image/${username}`,
            }),
            providesTags: result => ['Users']
        }),
        createUsers: build.mutation<any | userReq, IAddUser>({
            query: (user) => ({
                url: '/auth/registration',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']  
        }),
        loginUser: build.mutation<any | userReq, LoginUser>({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {useCreateUsersMutation, useLoginUserMutation, useGetNameByTokenMutation, useGetUserByIdQuery, useGetNameByNameQuery, useGetImageByNameQuery} = usersApi
