import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router";
import { routeConfig } from "../lib/data";
import { AppRoutesProps } from "../types/types";
import { RequireAuth } from "./RequireAuth ";
import { Loading } from "@/shared/ui/Loading";

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<Loading />}>
                {route.page}
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.onlyAdmin ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};
