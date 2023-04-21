import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UpdateComm {
    id: number;
    text: string;
}

const baseUrl = 'http://localhost:80'


export const rateApi = createApi({
    reducerPath: 'rateApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['Rate'],
    endpoints: (build) => ({
        getRateById: build.query<any, any>({
            query: (id) => ({
                url: `/rate/one?user_id=${id.user_id}&prod_i=${id.prod_id}`
            }),
            providesTags: result => ['Rate']
        }),
        createRate: build.mutation<any, any>({
            query: (rate) => ({
                url: '/rate/add',
                method: 'POST',
                body: rate
            }),
            invalidatesTags: ['Rate']
        }),
        updateRate: build.mutation<any, any>({
            query: (rate) => ({
                url: '/rate/change',
                method: 'PUT',
                body: rate
            }),
            invalidatesTags: ['Rate']
        }),
        deleteRate: build.mutation<any, number>({
            query: (id) => ({
                url: `/rate/delete?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Rate']
        }),
    })
})


export const {
    useCreateRateMutation,
    useDeleteRateMutation,
    useGetRateByIdQuery,
    useUpdateRateMutation
} = rateApi
