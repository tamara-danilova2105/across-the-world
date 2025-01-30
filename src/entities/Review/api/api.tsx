import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface ReviewsTag {
    type: 'Reviews';
    id: string;
};

const REVIEWS_TAG: ReviewsTag[] = [{ type: 'Reviews', id: 'LIST' }];

const url = endpoints.path.reviews;

const reviewsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getReviews: build.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params);
                return createApiConfig('GET', `${url}?${searchParams}`);
            },
            providesTags: () => REVIEWS_TAG,
        }),
        addReview: build.mutation({
            query: (newReview) => createApiConfig('POST', `${url}`, false, newReview),
            invalidatesTags: REVIEWS_TAG,
        }),
        moderateReview: build.mutation({
            query: ({ id }) => createApiConfig('PUT', `${endpoints.path.reviews}/${id}`, true, { isModeration: true }),
            invalidatesTags: REVIEWS_TAG,
        }),
        deleteReview: build.mutation({
            query: (id) => createApiConfig('DELETE', `${url}/${id}`),
            invalidatesTags: REVIEWS_TAG,
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useAddReviewMutation,
    useModerateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApi;
