import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { apiUrl, endpoints } from "./endpoints";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
        const token = Cookies.get('authToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReath: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {

        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            const refreshToken = Cookies.get('refreshToken');

            if (refreshToken) {
                const refreshResult = await baseQuery({
                    url: endpoints.admin.refresh,
                    method: 'PUT',
                    body: { refreshToken },
                },
                    api,
                    extraOptions
                )

                if (refreshResult.data) {
                    const { token: newToken, refreshToken: newRefreshToken } = refreshResult.data as {
                        token: string;
                        refreshToken: string;
                    }

                    Cookies.set('authToken', newToken, { expires: 1 })
                    Cookies.set('refreshToken', newRefreshToken, { expires: 30 })

                    result = await baseQuery(args, api, extraOptions);
                } else {

                    Cookies.remove('authToken');
                    Cookies.remove('refreshToken');
                    window.location.href = '/sigin';
                }
            }
        }
        return result;
    }

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReath,
    tagTypes: ['Tour', 'Admin', 'Regions', 'Reviews', 'News'],
    endpoints: () => ({})
})