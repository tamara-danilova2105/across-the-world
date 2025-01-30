import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface AdminTag {
    type: 'Admin';
    id: string; 
}

const ADMIN_TAG: AdminTag[] = [{ type: 'Admin', id: 'Admins' }];

const adminApi = api.injectEndpoints({
    endpoints: (build) => ({
        signin: build.mutation({
            query: (body) =>
                createApiConfig('POST', `${endpoints.admin.signin}`, true, body),
            invalidatesTags: ADMIN_TAG,
        }),
        resetPassword: build.mutation({
            query: (body) =>
                createApiConfig('POST', `${endpoints.admin.reset_password}`, true, body),
            invalidatesTags: ADMIN_TAG,
        }),
        refreshPassword: build.mutation({
            query: (body) =>
                createApiConfig('PUT', `${endpoints.admin.refresh_password}`, true, body),
            invalidatesTags: ADMIN_TAG,
        }),
        logout: build.mutation({
            query: (body) =>
                createApiConfig('DELETE', `${endpoints.admin.logout}`, true, body),
            invalidatesTags: ADMIN_TAG,
        }),
    }),
});

export const {
    useSigninMutation,
    useResetPasswordMutation,
    useRefreshPasswordMutation,
    useLogoutMutation,
} = adminApi;