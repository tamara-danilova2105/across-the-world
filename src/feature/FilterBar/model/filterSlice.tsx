import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataFilter, dataFilterRange } from '../lib/data';

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

type FilterKeys = keyof typeof dataFilter;
type FilterRangeKeys = keyof typeof dataFilterRange;


export interface ClearFilterPayload {
    filter: FilterKeys | FilterRangeKeys | 'region';
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
            } else if (key) {
                const category = state[filter] as Record<string, string>;
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