import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-sewwandi-dev.onrender.com/api",
    credentials: 'include',
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET"
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch products'
      })
    }),
    getCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET"
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch categories'
      })
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
        headers: {
          'Content-Type': 'application/json',
          // Auth header will be added by prepareHeaders
        }
      }),
      // Add error handling
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Order creation failed'
      })
    }),
    createProduct: builder.mutation({
      query: (data) => {
        console.log('Creating product with data:', data);
        return {
          url: "products",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ['Products']
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ['Products']
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`
    }),
    getUserOrders: builder.query({
      query: () => "orders/user/orders"
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useCreateProductMutation,
  useGetProductQuery,
  useGetOrderQuery,
  useGetUserOrdersQuery
} = baseApi;