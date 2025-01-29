import { useForm, FormProvider } from 'react-hook-form';
import { Button } from "@/shared/ui/Button/Button";
import { Stack } from "@/shared/ui/Stack/Stack";
import { RegionTours } from '../RegionTours/RegionTours';
import { DateTours } from '../DateTours/DateTours';
import { MobileSearchTours } from '../MobileSeachTours/MobileSearchTours';
import { useResize } from '@/shared/hooks/useResize';
import { SearchMainPage } from '../SearchMainPage/SearchMainPage';
import styles from "./SearchToursMain.module.scss";

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface SearchTypes {
    main?: boolean
}

export const SearchToursMain = ({main} : SearchTypes) => {

    const width = useResize()

    const methods = useForm({ 
        mode: 'onSubmit',
        defaultValues: {
            region: '',
            date: ''
        }
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = () => {
        reset()
    };

    return (
        <FormProvider {...methods}>
            <form  onSubmit={handleSubmit(onSubmit)}>
                {main ? 
                <SearchMainPage/>
                : (<Stack className={styles.searchContainer}>
                    {width > 768 ? (
                    <Stack
                        gap='4'>
                        <RegionTours />
                        <DateTours />
                    </Stack> ) :
                    <MobileSearchTours/>}
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
