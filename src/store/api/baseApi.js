import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Add API URL validation
const API_URL = "https://fed-storefront-backend-sewwandi-dev.onrender.com/api";

// Validate API URL
fetch(`${API_URL}/health`)
  .then(res => res.json())
  .then(data => console.log('✅ Backend health check:', data))
  .catch(err => console.error('❌ Backend not reachable:', err));

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      try {
        console.log('🔍 Making request to:', API_URL);
        const token = await window.Clerk?.session?.getToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        return headers;
      } catch (error) {
        console.error('Error preparing headers:', error);
        return headers;
      }
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
