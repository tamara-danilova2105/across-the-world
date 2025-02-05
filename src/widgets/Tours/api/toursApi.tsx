import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";
import { createQueryString } from "./queryUtils";

interface TourTag {
    type: 'Tour';
    id: string; 
}

const TOURS_TAG: TourTag[] = [{ type: 'Tour', id: 'Tours'}];

const toursApi = api.injectEndpoints({
    endpoints:(build) => ({
        getAllTours: build.query({
            query: (params) => createApiConfig(
                'GET',
                `${endpoints.path.tours}/${params.limit}/${params.page}?${createQueryString(params.filters || {})}`,
            ),
            providesTags: () => TOURS_TAG,
        }),
        getTour: build.query({
            query: ({ id }: { id: string }) => createApiConfig(
                'GET',
                `${endpoints.path.tours}/${id}`
            ),
            providesTags: () => TOURS_TAG,
        }),
        addTour: build.mutation({
            query: (body) => createApiConfig(
                'POST',
                `${endpoints.path.tours}`,
                true,
                body
            ),
            invalidatesTags: TOURS_TAG,
        }),
        editTour: build.mutation({
            query: (body) => createApiConfig(
                'PUT',
                `${endpoints.path.tours}/${body.id}`,
                true,
                body
            ),
            invalidatesTags: TOURS_TAG,
        }),
        deleteTour: build.mutation({
            query: ({ id }:{ id: string }) => createApiConfig(
                'DELETE',
                `${endpoints.path.tours}/${id}`,
                true
            ),
            invalidatesTags: TOURS_TAG,
        })
    })
})

export const {
    useGetAllToursQuery,
    useLazyGetAllToursQuery,
} = toursApi


