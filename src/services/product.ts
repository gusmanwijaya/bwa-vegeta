import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface ProductsResponse extends BaseResponse {
  data: {
    totalProducts: number;
    products: Product[];
  };
}

interface ProductAPIParams {
  page?: string | undefined;
  category?: string | undefined;
  min_price?: string | undefined;
  max_price?: string | undefined;
  rating?: string | undefined;
}

interface ProductByIdResponse extends BaseResponse {
  data: Product;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, ProductAPIParams>({
      query: ({ page, category, min_price, max_price, rating }) => ({
        url: "/",
        params: {
          page: page || undefined,
          category: category || undefined,
          min_price: min_price || undefined,
          max_price: max_price || undefined,
          rating: rating || undefined,
        },
      }),
    }),
    getProductById: builder.query<ProductByIdResponse, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
