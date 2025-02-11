import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface FAQsTag {
    type: "FAQs";
    id: string;
}

const FAQ_TAG: FAQsTag[] = [{ type: "FAQs", id: "LIST" }];

const url = endpoints.path.faqs;

const faqApi = api.injectEndpoints({
    endpoints: (build) => ({
        getFAQs: build.query({
            query: () => createApiConfig("GET", url),
            providesTags: () => FAQ_TAG,
        }),
        updateFAQs: build.mutation({
            query: (faqs) => createApiConfig("PUT", url, true, faqs),
            invalidatesTags: FAQ_TAG,
        }),
    }),
});

export const { useGetFAQsQuery, useUpdateFAQsMutation } = faqApi;
