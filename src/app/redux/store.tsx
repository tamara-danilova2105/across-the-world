import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { api } from "../../shared/api/api";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: Middleware) =>
        getDefaultMiddleware().concat(api.middleware),
});