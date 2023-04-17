import { StringDecoder } from 'string_decoder';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProducts } from '../../types/types';
import { idText } from 'typescript';


const baseUrl = 'http://localhost:80/products'

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['products', 'manufacturer', 'category'],
    endpoints: (build) => ({
        fetchAllProducts: build.query<IProducts[], void>({
            query: () => ({
                url: '/all'
            }),
            providesTags: result => ['products']
        }),
        getProductById: build.query<any, string | undefined>({
            query: (id) => ({
                url: `/one?id=${id}`
            }),
            providesTags: result => ['products']
        }),
        getProductByName: build.query<any[], string | undefined>({
            query: (username) => ({
                url: `/name?username=${username}`
            }),
            providesTags: result => ['products']
        }),
        createProduct: build.mutation<any, any>({
            query: (product) => ({
                url: '/create',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: build.mutation<any, any>({
            query: (product) => ({
                url: `/update`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['products']
        }),
        deleteProduct: build.mutation<any, string | undefined>({
            query: (id) => ({
                url: `/delete?id=${id}`,
                method: 'DELETE',   
            }),
            invalidatesTags: ['products']
        }),
        fetchManufacturers: build.query<any, void>({
            query: () => ({
                url: `/delete/manufacturer/all`
            }),
            providesTags: result => ['manufacturer']
        }),
        addManufacturer: build.mutation<any, string>({
            query: (name) => ({
                url: '/delete/manufacturer/add',
                body: name
            }),
            invalidatesTags: ['manufacturer']
        }),
        deleteManufacturer: build.mutation<any, number>({
            query: (id) => ({
                url: `/delete/manufacturer/delete${id}`
            }),
            invalidatesTags: ['manufacturer']
        }),
        fetchCategory: build.query<any, void>({
            query: () => ({
                url: `/delete/category/all`
            }),
            providesTags: result => ['category']
        }),
        addCategory: build.mutation<any, string>({
            query: (name) => ({
                url: '/delete/category/add',
                body: name
            }),
            invalidatesTags: ['category']
        }),
        deleteCategory: build.mutation<any, number>({
            query: (id) => ({
                url: `/delete/category/delete${id}`
            }),
            invalidatesTags: ['category']
        }),
    })
})

export const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useFetchAllProductsQuery, 
    useGetProductByIdQuery, 
    useGetProductByNameQuery, 
    useUpdateProductMutation, 
    useAddManufacturerMutation,
    useDeleteManufacturerMutation,
    useLazyFetchAllProductsQuery,
    useFetchManufacturersQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoryQuery
} = productApi



