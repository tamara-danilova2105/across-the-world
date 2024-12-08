import { Navigate, useLocation } from "react-router";
import { getRouteMain } from "../lib/helper";
import { useAuth } from "@/shared/hooks/useAuth";

interface RequireAuthProps {
    children: JSX.Element;
};

export function RequireAuth({ children }: RequireAuthProps) {
    const { isAuth } = useAuth();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    return children;
};