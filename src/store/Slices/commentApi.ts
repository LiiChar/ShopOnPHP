import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IAddComment {
    author: string
    text: string; 
    to: number;
    jwtToken?: string
}

interface UpdateComm {
    id: number;
    text: string;
}

const baseUrl = 'http://localhost:80'


export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['Comments'],
    endpoints: (build) => ({
        fetchAllComments: build.query<any[], void>({
            query: () => ({
                url: '/comments'
            }),
            providesTags: result => ['Comments']
        }),
        createComment: build.mutation<any, IAddComment>({
            query: (comment) => ({
                url: '/comments',
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Comments']
        }),
        updateComment: build.mutation<any, UpdateComm>({
            query: (comment) => ({
                url: '/comments',
                method: 'PUT',
                body: comment
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: build.mutation<any, {id: number}>({
            query: (comment) => ({
                url: '/comments',
                method: 'DELETE',
                body: comment
            }),
            invalidatesTags: ['Comments']
        })
    })
})


export const {useCreateCommentMutation, useFetchAllCommentsQuery, useDeleteCommentMutation, useUpdateCommentMutation} = commentsApi
