import { useDispatch } from "react-redux";
import { clearAllFilters } from "@/feature/FilterBar/model/filterSlice";

export const useClearFilters = () => {
    const dispatch = useDispatch();

    return () => {
        console.log("Очистка фильтров")
        dispatch(clearAllFilters())
    };
}