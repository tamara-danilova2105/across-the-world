import { useForm, FormProvider } from 'react-hook-form';
import { Button } from "@/shared/ui/Button/Button";
import { Stack } from "@/shared/ui/Stack/Stack";
import { RegionTours } from '../RegionTours/RegionTours/RegionTours';
import { DateTours } from '../DateTours/DateTours/DateTours';
import { MobileSearchTours } from '../MobileSeachTours/MobileSearchTours';
import { useResize } from '@/shared/hooks/useResize';
import { SearchMainPage } from '../SearchMainPage/SearchMainPage';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useGetRegionsQuery } from '@/entities/Region/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersState, setFilter } from '@/feature/FilterBar/model/filterSlice';
import { parsedDate } from '@/shared/lib/parsedDate';
import styles from "./SearchToursMain.module.scss";

interface SearchTypes {
    main?: boolean
}

export const SearchToursMain = ({ main }: SearchTypes) => {
    const width = useResize();
    const filterState = useSelector(getFiltersState);
    const dispatch = useDispatch();

    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            region: filterState.region,
            date: parsedDate(filterState.dates)
        }
    })

    const { handleSubmit, watch } = methods;
    const regionValue = watch('region')

    const debouncedSearch = useDebounce({ value: regionValue, delay: 300 })
    const { data: regions, error, isLoading } = useGetRegionsQuery({ search: debouncedSearch })

    const onSubmit = (formData: { region: string; date: string }) => {
        const regionString = Array.isArray(formData.region) ? formData.region.join('') : formData.region;

        if (!regionString && !formData.date) {
            console.log("Форма не может быть полностью пустой. Пожалуйста, заполните хотя бы одно поле.")
            return;
        }
        dispatch(setFilter({ 
            region: regionString,
            dates: filterState.dates
        }))
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {main ? (
                    <SearchMainPage regions={regions} error={error} isLoading={isLoading} />
                ) : (
                    <Stack className={styles.searchContainer}>
                        {width > 768 ? (
                            <Stack gap="4">
                                <RegionTours regions={regions} error={error} isLoading={isLoading} />
                                <DateTours />
                            </Stack>
                        ) : (
                            <MobileSearchTours regions={regions} error={error} isLoading={isLoading} />
                        )}
                        <Button type="submit" className={styles.button}>
                            Найти
                        </Button>
                    </Stack>
                )}
            </form>
        </FormProvider>
    );
};
