import { useDispatch, useSelector } from "react-redux";
import { clearAllFilters, getFiltersState } from "@/feature/FilterBar/model/filterSlice";
import { useNavigate } from "react-router";
import { getRouteTours } from "@/app/router/lib/helper";

export const useClearFilters = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { region } = useSelector(getFiltersState)

    return () => {
        dispatch(clearAllFilters())
        
        if (region) {
            navigate(getRouteTours())
        }
    }
}
