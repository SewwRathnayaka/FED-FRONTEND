export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-manupa.onrender.com/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // ... existing code ...
}); 