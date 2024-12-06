import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { EndpointBuilder } from "@reduxjs/toolkit/query"; 
import * as Cookies from "js-cookie";
import { apiUrl } from "./endpoints";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers: Headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: (builder: EndpointBuilder<any, any, any>) => ({})
});