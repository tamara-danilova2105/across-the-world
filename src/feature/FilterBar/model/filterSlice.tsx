import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    type_tour: Record<string, boolean>;
    price: [number, number];
    duration: [number, number];
}

const initialState: FiltersState = {
    type_tour: {},
    duration: [1, 25],
    price: [0, 500000],
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
        clearAllFilters: (state: FiltersState) => {
            state.type_tour = initialState.type_tour;
            state.price = initialState.price;
            state.duration = initialState.duration;
        },
    },
});

export const { setFilter, clearAllFilters } = filterSlice.actions;
export const getFiltersState = (state: {filters: FiltersState}) => state.filters;
export default filterSlice.reducer;