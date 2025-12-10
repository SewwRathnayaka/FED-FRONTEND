import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-sewwandi.onrender.com/api/",
    prepareHeaders: async (headers) => {
      // Get regular token for most endpoints (products, orders, payments)
      // Admin endpoints can override this if needed
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Add default caching behavior
  keepUnusedDataFor: 60, // Cache data for 60 seconds
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        console.log('🔵 Fetching products from API...');
        return "products";
      },
      providesTags: ['Products'],
      // Transform response to extract products array from { products: [...], pagination: {...} }
      transformResponse: (response, meta, arg) => {
        console.log('🟢 Raw API response:', response);
        console.log('🟢 Response type:', typeof response);
        console.log('🟢 Is array?', Array.isArray(response));
        
        // Backend returns: { products: [...], pagination: {...} }
        if (response && typeof response === 'object') {
          if (Array.isArray(response.products)) {
            console.log(`✅ Extracted ${response.products.length} products`);
            return response.products;
          }
          if (Array.isArray(response)) {
            console.log(`✅ Response is already an array with ${response.length} items`);
            return response;
          }
        }
        // Fallback to empty array if structure is unexpected
        console.warn('⚠️ Unexpected products response structure:', response);
        return [];
      },
      transformErrorResponse: (response, meta, arg) => {
        console.error('❌ Products API Error:', response);
        return response;
      },
      // Cache for 5 minutes since products don't change frequently
      keepUnusedDataFor: 300,
    }),
    getCategories: builder.query({
      query: () => {
        console.log('🔵 Fetching categories from API...');
        return "categories";
      },
      transformResponse: (response) => {
        console.log('🟢 Raw categories response:', response);
        // Backend might return array directly or wrapped
        if (Array.isArray(response)) {
          console.log(`✅ Extracted ${response.length} categories`);
          return response;
        }
        if (response && Array.isArray(response.categories)) {
          console.log(`✅ Extracted ${response.categories.length} categories`);
          return response.categories;
        }
        console.warn('⚠️ Unexpected categories response structure:', response);
        return [];
      },
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
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => {
        if (!sessionId) {
          throw new Error('Session ID is required');
        }
        return `payments/session-status?session_id=${sessionId}`;
      }
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
  useGetUserOrdersQuery,
  useGetCheckoutSessionStatusQuery
} = baseApi;