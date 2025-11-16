console.log("✅ Base API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  }),
  tagTypes: ["Survey", "Question", "Organizations"],
  endpoints: () => ({}),
});
