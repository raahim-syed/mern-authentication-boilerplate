import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// This url is called
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/users",  
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({})
})