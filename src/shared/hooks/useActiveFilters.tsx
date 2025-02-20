// import { dataFilterRange } from '@/feature/FilterBar/lib/data';
// import { useCallback } from 'react';

// type FilterState = Record<string, any>;
// type DataFilterRange = typeof dataFilterRange;
// type FilterRangeKeys = keyof DataFilterRange;

// export const useActiveFilters = (filterState: FilterState) => {
//     const getActiveFiltersCount = useCallback(() => {
//         let count = 0;
        
//         Object.entries(filterState).forEach(([key, value]) => {
//             if (key === 'type_tour' || key === 'discount') {
//                 if (value && typeof value === 'object') {
//                     count += Object.values(value).filter(Boolean).length;
//                 }
//             } else if (Array.isArray(value)) {
//                 const defaultRange = dataFilterRange[key as FilterRangeKeys]?.defaultValues;
//                 if (
//                     defaultRange && 
//                     value[0] !== null && value[1] !== null &&  
//                     (value[0] !== defaultRange[0] || value[1] !== defaultRange[1])
//                 ) {
//                     count += 1;
//                 }
//             }  else if (key === 'region' && value) {
//                 count += 1;
//             } else if (key === 'dates' && value.startDate || value.endDate) {
//                 count += 1;
//             }
//         });

//         return count
//     }, [filterState])

//     return {
//         activeFiltersCount: getActiveFiltersCount(),
//         getActiveFiltersCount
//     }
// }

import { dataFilterRange } from '@/feature/FilterBar/lib/data';
import { useCallback } from 'react';

type FilterState = Record<string, any>;
type DataFilterRange = typeof dataFilterRange;
type FilterRangeKeys = keyof DataFilterRange;


export const useActiveFilters = (filterState: FilterState) => {
    const getActiveFiltersCount = useCallback(() => {
        let count = 0;

        Object.entries(filterState).forEach(([key, value]) => {
            if (key === 'type_tour' || key === 'discount') {
                if (value && typeof value === 'object') {
                    count += Object.values(value).filter(Boolean).length;
                }
            } else if (Array.isArray(value)) {
                const defaultRange = dataFilterRange[key as FilterRangeKeys]?.defaultValues;
                if (
                    defaultRange &&
                    (value[0] !== null || value[1] !== null) &&
                    (value[0] !== defaultRange[0] || value[1] !== defaultRange[1])
                ) {
                    count += 1;
                }
            } else if (key === 'region' && value) {
                count += 1;
            } else if (key === 'dates' && (value.startDate || value.endDate)) {
                count += 1;
            }
        });

        return count;
    }, [filterState]);

    return {
        activeFiltersCount: getActiveFiltersCount(),
        getActiveFiltersCount,
    };
};