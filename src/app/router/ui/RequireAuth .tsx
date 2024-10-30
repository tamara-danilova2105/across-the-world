import { Navigate, useLocation } from "react-router";
import { getRouteMain } from "../lib/helper";

interface RequireAuthProps {
    children: JSX.Element;
};

export function RequireAuth({ children }: RequireAuthProps) {
    const auth = false;
    const location = useLocation();

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    return children;
};