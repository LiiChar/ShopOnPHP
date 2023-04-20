import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProducts } from '../../types/types';


const baseUrl = 'http://localhost:80/'

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['products', 'manufacturer', 'category'],
    endpoints: (build) => ({
        fetchAllProducts: build.query<IProducts[], void>({
            query: () => ({
                url: 'products/all'
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
        }),
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
        }),
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
    useFetchCategoryQuery,
    useGetProductIdMutation
} = productApi



