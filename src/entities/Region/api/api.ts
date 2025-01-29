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
        })
    }),
});

export const {
    useGetRegionsQuery,
    useSaveRegionMutation,
} = regionsApi;

