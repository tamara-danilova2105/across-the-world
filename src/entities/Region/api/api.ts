import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

interface RegionsTag {
    type: 'Regions';
    id: string;
};
const REGIONS_TAG: RegionsTag[] = [{ type: 'Regions', id: 'LIST' }];

const regionsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRegions: build.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params);
                return createApiConfig('GET', `${endpoints.path.regions}?${searchParams}`);
            },
            providesTags: () => REGIONS_TAG,
        }),
        saveRegion: build.mutation({
            query: (newRegion) => createApiConfig('POST', `${endpoints.path.regions}`, true, newRegion),
            invalidatesTags: REGIONS_TAG,
        }),
        deleteRegion: build.mutation({
            query: (regionId) => createApiConfig('DELETE', `${endpoints.path.regions}/${regionId}`),
            invalidatesTags: () => REGIONS_TAG,
        }),
        updateRegion: build.mutation({
            query: ({ regionId, direction, region }) =>
                createApiConfig('PUT', `${endpoints.path.regions}/${regionId}`, true, { direction, region }),
            invalidatesTags: () => REGIONS_TAG,
        }),
    }),
});

export const {
    useGetRegionsQuery,
    useSaveRegionMutation,
    useDeleteRegionMutation,
    useUpdateRegionMutation,
} = regionsApi;

