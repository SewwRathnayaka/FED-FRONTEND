import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-sewwandi.onrender.com/api/",
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken({ template: 'admin-role' });
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: async (...args) => {
      console.log('API Call:', args[0]);
      const response = await fetch(...args);
      console.log('API Response:', response.status, response.statusText);
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
      }
      return response;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ['Products']
    }),
    getCategories: builder.query({
      query: () => "categories",
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