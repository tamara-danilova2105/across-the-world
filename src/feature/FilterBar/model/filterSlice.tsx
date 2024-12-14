import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    type_tour: Record<string, boolean>;
    region: { 
        regions: Record<string, boolean>,
        country: Record<string, boolean> 
    },
    season: Record<string, boolean>;
    price: [number, number];
    duration: [number, number];
}

const initialState: FiltersState = {
    type_tour: {},
    region: { regions: {}, country: {} },
    season: {},
    duration: [3, 10],
    price: [20000, 100000],
}

type FilterKeys = keyof FiltersState;

export interface ClearFilterPayload {
    filter: FilterKeys;
    key?: string;
}


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (state: FiltersState, action: PayloadAction<Partial<FiltersState>>) => {
            return { ...state, ...action.payload };
        },
        clearFilter: (state: FiltersState, action: PayloadAction<ClearFilterPayload>) => {
            const { filter, key } = action.payload;

            if (filter === 'price') {
                state.price = initialState.price;
            } else if (filter === 'duration') {
                state.duration = initialState.duration;
            } else if (filter === 'region') {
                if (key) {
                    if (key in state.region.regions) {
                        delete state.region.regions[key];
                    } else if (key in state.region.country) {
                        delete state.region.country[key];
                    }
                }
            } else if (key && filter in state) {
                const category = state[filter as keyof FiltersState] as Record<string, boolean>;
                if (category) {
                    delete category[key];
                }
            }
        },
        clearAllFilters: () => initialState,
    },
});

export const { setFilter, clearFilter, clearAllFilters } = filterSlice.actions;
export const getFiltersState = (state: {filters: FiltersState}) => state.filters;
export default filterSlice.reducer;