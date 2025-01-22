import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface AdminTag {
    type: 'Admin';
    id: string; 
}

interface ResetPasswordBody {
    email: string;
}

interface Admin {
    login: string;
    email?: ResetPasswordBody;
    password: string | number;
}

interface RefreshPasswordBody {
    password: string | number;
    resetToken: string;
}

interface LogoutBody {
    cookies:  string;
}

const ADMIN_TAG: AdminTag[] = [{ type: 'Admin', id: 'Admins' }];

const adminApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (body: Admin) =>
                createApiConfig({
                    method: 'POST',
                    url: `${endpoints.admin.login}`,
                    body,
                }),
            providesTags: (): AdminTag[] => ADMIN_TAG,
        }),
        resetPassword: build.mutation({
            query: (body: ResetPasswordBody) =>
                createApiConfig({
                    method: 'POST',
                    url: `${endpoints.admin.reset_password}`,
                    body,
                }),
            invalidatesTags: ADMIN_TAG,
        }),
        refreshPassword: build.mutation({
            query: (body: RefreshPasswordBody) =>
                createApiConfig({
                    method: 'PUT',
                    url: `${endpoints.admin.refresh_password}`,
                    body,
                }),
            invalidatesTags: ADMIN_TAG,
        }),
        logout: build.mutation({
            query: ({ cookies }: LogoutBody) =>
                createApiConfig({
                    method: 'DELETE',
                    url: `${endpoints.admin.logout}`,
                    cookies,
                }),
            invalidatesTags: ADMIN_TAG,
        }),
    }),
});

export const {
    useLoginMutation,
    useResetPasswordMutation,
    useRefreshPasswordMutation,
    useLogoutMutation,
} = adminApi;