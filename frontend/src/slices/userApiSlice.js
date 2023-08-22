import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth",
                method: "POST",
                body: data,
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: "/logout",
                method: "POST",
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: "/update",
                method: "PUT",
                body: data,
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: "/delete",
                method: "DELETE",
                body: data,
            })
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, 
                useRegisterMutation, useDeleteUserMutation,
                useUpdateUserMutation } = usersApiSlice;