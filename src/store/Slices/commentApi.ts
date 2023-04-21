import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UpdateComm {
    id: number;
    text: string;
}

const baseUrl = 'http://localhost:80'


export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['Comments', 'Rate'],
    endpoints: (build) => ({
        fetchAllComments: build.query<any[], number>({
            query: (id) => ({
                url: `/comments/all?id=${id}`
            }),
            providesTags: result => ['Comments']
        }),
        getCommentById: build.query<any, number>({
            query: (id) => ({
                url: `/comments/one?id=${id}`
            }),
            providesTags: result => ['Comments']
        }),
        createComment: build.mutation<any, any>({
            query: (comment) => ({
                url: '/comments/create',
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Comments']
        }),
        updateComment: build.mutation<any, UpdateComm>({
            query: (comment) => ({
                url: '/comments/update',
                method: 'PUT',
                body: comment
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: build.mutation<any, number>({
            query: (id) => ({
                url: `/comments/delete?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments']
        })
    })
})


export const {
    useCreateCommentMutation, 
    useFetchAllCommentsQuery,
    useDeleteCommentMutation, 
    useUpdateCommentMutation, 
    useGetCommentByIdQuery,
} = commentsApi
