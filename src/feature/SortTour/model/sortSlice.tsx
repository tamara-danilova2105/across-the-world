import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    option: 'soon',
    label: 'Ближайшие'
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action) => {
            const { value, label } = action.payload; 
            state.option = value;
            state.label = label;
        },
    },
});

export const { setSort } = sortSlice.actions;
export const getSortState = (state) => state.sort;
export default sortSlice.reducer;