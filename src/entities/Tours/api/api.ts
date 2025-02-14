import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface TourTag {
    type: "Tour";
    id: string;
}

const TOUR_TAG: TourTag[] = [{ type: "Tour", id: "LIST" }];

const url = endpoints.path.tours;

const toursApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllTours: build.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params);
                return createApiConfig("GET", `${url}?${searchParams}`);
            },
            providesTags: () => TOUR_TAG,
        }),
        getTourById: build.query({
            query: (id: string) => createApiConfig("GET", `${url}/${id}`),
        }),
        addTour: build.mutation({
            query: (newTour) => createApiConfig("POST", `${url}`, true, newTour),
            invalidatesTags: TOUR_TAG,
        }),
        uploadFiles: build.mutation({
            query: (formData) => createApiConfig("POST", `${endpoints.path.upload}`, false, formData),
        }),
        editTour: build.mutation({
            query: ({ id, updatedData }) => createApiConfig("PUT", `${url}/${id}`, true, updatedData),
            invalidatesTags: TOUR_TAG,
        }),
        updateTourDetails: build.mutation({
            query: ({ id, updateData }) => createApiConfig("PATCH", `${url}/${id}`, true, updateData),
            invalidatesTags: TOUR_TAG,
        }),
        deleteTour: build.mutation({
            query: (id: string) => createApiConfig("DELETE", `${url}/${id}`, true),
            invalidatesTags: TOUR_TAG,
        }),
    }),
});

export const {
    useGetAllToursQuery,
    useGetTourByIdQuery,
    useLazyGetTourByIdQuery,
    useAddTourMutation,
    useUploadFilesMutation,
    useEditTourMutation,
    useUpdateTourDetailsMutation,
    useDeleteTourMutation,
} = toursApi;
