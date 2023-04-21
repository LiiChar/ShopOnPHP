import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetIProducts } from '../../types/types';


const baseUrl = 'http://localhost:80/'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['category'],
    endpoints: (build) => ({
        fetchCategory: build.query<any, void>({
            query: () => ({
                url: `products/category/all`
            }),
            providesTags: result => ['category']
        }),
        addCategory: build.mutation<any, string>({
            query: (name) => ({
                url: 'products/category/add',
                method: 'POST',
                body: { name }
            }),
            invalidatesTags: ['category']
        }),
        deleteCategory: build.mutation<any, number>({
            query: (id) => ({
                url: `products/category/delete${id}`
            }),
            invalidatesTags: ['category']
        }),
    })
})

export const {
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoryQuery
} = categoryApi



