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

export const createQueryString = (params: Filters) => {
    const query = new URLSearchParams()

    if (params?.sort) {
        query.append("sort", JSON.stringify(params.sort))
    }

    if (params?.filter) {
        query.append("filter", JSON.stringify(params.filter))
    }

    return query.toString()
}
