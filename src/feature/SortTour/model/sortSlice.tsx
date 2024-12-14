import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortDataProps } from '../lib/data';

interface SortState {
    option: string;
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
        setSort: (state: SortState , action: PayloadAction<Partial<SortDataProps>>) => {
            const { value, label } = action.payload; 
            state.option = value;
            state.label = label;
        },
    },
});

export const { setSort } = sortSlice.actions;
export const getSortState = (state: { sort: SortState }) => state.sort;
export default sortSlice.reducer;