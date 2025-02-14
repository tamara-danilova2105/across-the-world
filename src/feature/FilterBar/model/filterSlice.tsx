import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DateRange {
    startDate: string | null; 
    endDate: string | null;   
}

export interface FiltersState {
    type_tour: Record<string, boolean>;
    discount: Record<string, boolean>;
    price: [number, number];
    duration: [number, number];
    region: string;
    dates: DateRange;
}

const initialState: FiltersState = {
    type_tour: {},
    discount: {},
    duration: [1, 25],
    price: [0, 500000],
    region: '',
    dates: {
        startDate: null,
        endDate: null,
    },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (state: FiltersState, action: PayloadAction<Partial<FiltersState>>) => {
            Object.assign(state, action.payload);
        },
        clearAllFilters: (state: FiltersState) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setFilter, clearAllFilters } = filterSlice.actions;
export const getFiltersState = (state: {filters: FiltersState}) => state.filters;
export default filterSlice.reducer;
