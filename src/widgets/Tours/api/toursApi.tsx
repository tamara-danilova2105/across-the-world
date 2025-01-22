import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";
import { Tour } from "@/widgets/OurTours/lib/data";
import { createQueryString } from "./queryUtils";

interface TourTag {
    type: 'Tour';
    id: string; 
}

interface BodyType {
    body: Tour[],
    id: string
}

export interface Filters {
    filter?: {
        duration?: [number, number]; 
        price?: [number, number]; 
        region?: {
            regions?: Record<string, any>; 
            country?: Record<string, any>;
        };
        season?: Record<string, boolean>;
        type_tour?: Record<string, boolean>;
    }
    sort?: {
        label: string; 
        option: string; 
    }
}

interface GetToursParams {
    limit: number;
    page: number;
    filters?: Filters;
}

const TOURS_TAG: TourTag[] = [{ type: 'Tour', id: 'Tours'}];

const toursApi = api.injectEndpoints({
    endpoints:(build) => ({
        getAllTours: build.query({
            query: (params: GetToursParams) => createApiConfig({
                method: 'GET',
                url: `${endpoints.path.tours}/${params.limit}/${params.page}?${createQueryString(params.filters || {})}`,
            }),
            providesTags: () => TOURS_TAG,
        }),
        getTour: build.query({
            query: ({ id }: { id: string }) => createApiConfig({
                method: 'GET',
                url: `${endpoints.path.tours}/${id}`
            }),
            providesTags: () => TOURS_TAG,
        }),
        addTour: build.mutation({
            query: (body: Tour[]) => createApiConfig({
                method: 'POST',
                url: `${endpoints.path.tours}`,
                body
            }),
            invalidatesTags: TOURS_TAG,
        }),
        editTour: build.mutation({
            query: (body: BodyType) => createApiConfig({
                method: 'PUT',
                url: `${endpoints.path.tours}/${body.id}`,
                body
            }),
            invalidatesTags: TOURS_TAG,
        }),
        deleteTour: build.mutation({
            query: ({ id }:{ id: string }) => createApiConfig({
                method: 'DELETE',
                url: `${endpoints.path.tours}/${id}`
            }),
            invalidatesTags: TOURS_TAG,
        })
    })
})

export const {
    useGetAllToursQuery,
    useLazyGetAllToursQuery,
} = toursApi


