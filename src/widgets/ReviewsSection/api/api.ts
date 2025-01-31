import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";

const regionsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRegions: build.query({
            query: (params) => {
                const searchParams = new URLSearchParams(params);
                return createApiConfig('GET', `${endpoints.path.regions}?${searchParams}`);
            },
        }),
        saveRegion: build.mutation({
            query: (newRegion) => createApiConfig('POST', `${endpoints.path.regions}`, true, newRegion),
        })
    }),
});

export const {
    useGetRegionsQuery,
    useSaveRegionMutation,
} = regionsApi;