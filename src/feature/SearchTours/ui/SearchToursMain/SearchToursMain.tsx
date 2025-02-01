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
import styles from "./SearchToursMain.module.scss";

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface SearchTypes {
    main?: boolean
}

export const SearchToursMain = ({ main }: SearchTypes) => {

    const width = useResize()

    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            region: '',
            date: ''
        }
    });

    const { handleSubmit, watch, getValues } = methods;
    const regionValue = watch('region')

    const debouncedSearch = useDebounce({ value: regionValue, delay: 300 })
    const { data: regions, error, isLoading } = useGetRegionsQuery({
        search: debouncedSearch})

    const onSubmit = () => {
        const { region, date } = getValues();
        
        if (!region && !date) {
            console.log("Форма не может быть полностью пустой. Пожалуйста, заполните хотя бы одно поле.")
            return;
        }

        console.log('Отправка данных:', { region, date })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {main ?
                    <SearchMainPage 
                        regions={regions}
                        error={error}
                        isLoading={isLoading}
                    />
                    : (<Stack className={styles.searchContainer}>
                        {width > 768 ? (
                            <Stack
                                gap='4'>
                                <RegionTours                     
                                    regions={regions}
                                    error={error}
                                    isLoading={isLoading}
                                />
                                <DateTours />
                            </Stack>) :
                            <MobileSearchTours 
                                regions={regions}
                                error={error}
                                isLoading={isLoading}
                            />}
                        <Button
                            type='submit'
                            className={styles.button}
                        >
                            Найти
                        </Button>
                    </Stack>)}
            </form>
        </FormProvider>
    )
}
