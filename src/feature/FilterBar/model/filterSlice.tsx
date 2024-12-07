import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKeys, FilterRangeKeys } from '../lib/data';

interface FiltersState {
    type_tour: Record<string, string>;
    load_level: Record<string, string>;
    placement: Record<string, string>;
    season: Record<string, string>;
    price: [number, number];
    duration: [number, number];
}

interface Filters {
    filter: FilterKeys | FilterRangeKeys;
}

const initialState: FiltersState = {
    type_tour: {},
    load_level: {},
    placement: {},
    season: {},
    price: [20000, 100000],
    duration: [10, 30],
}


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (state: FiltersState, action: PayloadAction<Partial<FiltersState>>) => {
            return { ...state, ...action.payload };
        },
        clearFilter: (
            state: FiltersState,
            action: PayloadAction<{ filter: Filters; key?: string }>
        ) => {
            const { filter, key } = action.payload;

            if (filter === 'price') {
                state.price = [20000, 100000];
            } else if (filter === 'duration') {
                state.duration = [10, 30];
            } else if (key) {
                if (filter in state && typeof state[filter] === 'object' && !Array.isArray(state[filter])) {
                    const category = state[filter] as Record<string, string>;
                    delete category[key]; 
                }
            }
        },
        clearAllFilters: () => {
            return initialState;
        },
    }
});

export const { setFilter, clearFilter, clearAllFilters } = filterSlice.actions;
export default filterSlice.reducer;