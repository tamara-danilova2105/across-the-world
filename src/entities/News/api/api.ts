import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface NewsTag {
    type: 'News';
    id: string;
};

const NEWS_TAG: NewsTag[] = [{ type: 'News', id: 'LIST' }];

const url = endpoints.path.news;

const newsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllNews: build.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params);
                return createApiConfig('GET', `${url}?${searchParams}`);
            },
            providesTags: () => NEWS_TAG,
        }),
        getNewsById: build.query({
            query: (id: string) => createApiConfig('GET', `${url}/${id}`),
        }),
        addNews: build.mutation({
            query: (newNews) => createApiConfig('POST', `${url}`, true, newNews),
            invalidatesTags: NEWS_TAG,
        }),
        editNews: build.mutation({
            query: ({ id, updatedData }) => createApiConfig('PUT', `${url}/${id}`, true, updatedData),
            invalidatesTags: NEWS_TAG,
        }),
        deleteNews: build.mutation({
            query: (id: string) => createApiConfig('DELETE', `${url}/${id}`, true),
            invalidatesTags: NEWS_TAG,
        }),
    }),
});

export const {
    useGetAllNewsQuery,
    useGetNewsByIdQuery,
    useAddNewsMutation,
    useEditNewsMutation,
    useDeleteNewsMutation,
} = newsApi;
