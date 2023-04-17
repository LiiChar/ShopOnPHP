import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:80/busket'

interface AddBusk {
    user_id: number;
    product_id: number;
}

export const busketApi = createApi({
    reducerPath: 'busketApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['Busket'],
    endpoints: (build) => ({
        fetchBusket: build.query<any[], number>({
            query: (id) => ({
                url: `/user?user_id=${id}`
            }),
            providesTags: result => ['Busket']
        }),
        addBusket: build.mutation<string, AddBusk>({
            query: (busk) => ({
                url: '/add',
                method: 'POST',
                body: busk
            }),
            invalidatesTags: ['Busket']
        }),
        deleteBusket: build.mutation<any, AddBusk>({
            query: (busk) => ({
                url: '/delete',
                method: 'PUT',
                body: busk
            }),
            invalidatesTags: ['Busket']
        }),
    })
})


export const {useAddBusketMutation, useDeleteBusketMutation, useFetchBusketQuery} = busketApi
