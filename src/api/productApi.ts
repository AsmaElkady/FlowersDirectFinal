import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../constants/main"
import type { IProduct } from "../types/productType";

export const fetchProducts = createApi({
    reducerPath: "fetchProducts",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => "products"
        }),
        addProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (newProduct) => ({
                url: "products",
                method: "POST",
                body: newProduct,
            }),
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
        }),
        updateProduct: builder.mutation<IProduct, Partial<IProduct> & Pick<IProduct, "id">>({
            query: ({ id, ...updatedProduct }) => ({
                url: `products/${id}`,
                method: "PUT",
                body: updatedProduct,
            }),
        }),
    })
})

export const { useGetProductsQuery, useAddProductMutation,
    useDeleteProductMutation, useUpdateProductMutation, } = fetchProducts;