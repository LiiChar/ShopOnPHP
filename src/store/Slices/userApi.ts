
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        fetchAllUsers: build.query<any, void>({
            query: () => ({
                url: `/users/all`
            }),
            providesTags: result => ['Users']
        }),
        getUserById: build.query<any, any>({
            query: (id) => ({
                url: `/users/one?id=${id}`
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
        changeUser: build.mutation<any, any>({
            query: (data) => ({
                url: `/users/change`,
                method: 'POST',
                body: data
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
        }),
        deleteUser: build.mutation<any, any>({
            query: (id) => ({
                url: `/users/delete?id=${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Users']
        }),
        changeRole: build.mutation<any, any>({
            query: (data) => ({
                url: `/users/role?name=${data.user}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
    })
})

export const {
    useCreateUsersMutation, 
    useLoginUserMutation, 
    useGetUserByIdQuery,
    useDeleteUserMutation,
    useFetchAllUsersQuery,
    useChangeRoleMutation,
    useChangeUserMutation
} = usersApi
