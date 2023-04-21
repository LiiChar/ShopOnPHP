import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetIProducts } from '../../types/types';


const baseUrl = 'http://localhost:80/'

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['products'],
    endpoints: (build) => ({
        fetchAllProducts: build.query<GetIProducts, any>({
            query: (prod) => ({
                url: `products/all?page=${prod.page}&cat=${prod.category}&man=${prod.manufacturer}`
            }),
            providesTags: result => ['products']
        }),
        getProductById: build.query<any, string | undefined>({
            query: (id) => ({
                url: `products/one?id=${id}`
            }),
            providesTags: result => ['products']
        }),
        getProductId: build.mutation<any, string | undefined>({
            query: (id) => ({
                url: `products/one?id=${id}`
            }),
            invalidatesTags: ['products']
        }),
        getProductByName: build.query<any[], string | undefined>({
            query: (username) => ({
                url: `products/name?username=${username}`
            }),
            providesTags: result => ['products']
        }),
        createProduct: build.mutation<any, any>({
            query: (product) => ({
                url: 'products/create',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: build.mutation<any, any>({
            query: (product) => ({
                url: `products/update`,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['products']
        }),
        deleteProduct: build.mutation<any, string | undefined>({
            query: (name) => ({
                url: `products/delete?name=${name}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products']
        })
    })
})

export const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useFetchAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductByNameQuery,
    useUpdateProductMutation,
    useLazyFetchAllProductsQuery,
    useGetProductIdMutation
} = productApi



