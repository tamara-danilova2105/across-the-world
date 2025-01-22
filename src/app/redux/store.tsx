import filterSlice from "@/feature/FilterBar/model/filterSlice";
import sortSlice from "@/feature/SortTour/model/sortSlice";
import { api } from "@/shared/api/api";
import { combineReducers, configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    filters: filterSlice,
    sort: sortSlice
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
