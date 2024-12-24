import { SearchX } from 'lucide-react';
import { Stack } from "@/shared/ui/Stack/Stack"
import styles from "./BadSearch.module.scss"
import { Text } from '@/shared/ui/Text/Text';
import { Button } from '@/shared/ui/Button/Button';

export const BadSearch = () => {
    return(
        <Stack
            direction='column'
            align='center'
            justify='center'
            gap='32'
            max
            className={styles.badSearch_container}
        >
            <SearchX />
            <Stack
                direction='column'
                align='center'
                gap='16'
            >
                <Text 
                    type='h2'
                    size='24'
                    font='geometria500'
                    color='blue'
                >
                    Нет подходящих туров
                </Text>
                <Text 
                    size='24'
                >
                    попробуйте смягчить условия поиска
                </Text>
            </Stack>
            <Button>Сбросить фильтры</Button>
        </Stack>
    )
}