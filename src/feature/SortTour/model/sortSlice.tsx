import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
    option: string;
    label: string;
}

interface SelectedSort {
    value: string;
    label: string;
}

const initialState: SortState = {
    option: 'soon',
    label: 'Ближайшие',
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state: SortState , action: PayloadAction<SelectedSort>) => {
            const { value = 'soon', label = 'Ближайшие' } = action.payload; 
            state.option = value;
            state.label = label;
        },
    },
});

export const { setSort } = sortSlice.actions;
export const getSortState = (state: { sort: SortState }) => state.sort;
export default sortSlice.reducer;