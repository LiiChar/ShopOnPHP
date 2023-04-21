import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetIProducts } from '../../types/types';


const baseUrl = 'http://localhost:80/'

export const manufacturerApi = createApi({
    reducerPath: 'manufacturerApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['manufacturer'],
    endpoints: (build) => ({
        fetchManufacturers: build.query<any, void>({
            query: () => ({
                url: `products/manufacturer/all`
            }),
            providesTags: result => ['manufacturer']
        }),
        addManufacturer: build.mutation<any, string>({
            query: (name) => ({
                url: 'products/manufacturer/add',
                method: 'POST',
                body: { name }
            }),
            invalidatesTags: ['manufacturer']
        }),
        deleteManufacturer: build.mutation<any, any>({
            query: (id) => ({
                url: `products/manufacturer/delete?id=${id}`
            }),
            invalidatesTags: ['manufacturer']
        })
    })
})

export const {
    useAddManufacturerMutation,
    useDeleteManufacturerMutation,
    useFetchManufacturersQuery,
} = manufacturerApi



