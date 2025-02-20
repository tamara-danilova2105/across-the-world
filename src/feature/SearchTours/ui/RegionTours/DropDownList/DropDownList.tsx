import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { Loading } from "@/shared/ui/Loading";
import { Region } from '@/shared/types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import styles from "./DropDownList.module.scss";
import { Additional, getStyles } from "@/shared/lib/getStyles";

interface DropdownListProps {
    regions: Region[];
    isLoading?: boolean;
    error?: FetchBaseQueryError | SerializedError;
    onSelect: (regionName: string) => void;
    styleMode: 'list_desktop' | 'list_mobile';
}

export const DropdownList = ({ 
    regions, 
    isLoading, 
    error, 
    onSelect, 
    styleMode 
}: DropdownListProps) => {

    const additional: Additional = [styles[styleMode]]
    
    return (
        <Stack direction='column' gap='16' max
            className={getStyles(styles.list, {}, additional)}
            >
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Text font='geometria500'>Ошибка при загрузке регионов</Text>
            ) : regions.length > 0 ? (
                <ul>
                    <Text type='h2' font='geometria500' size='16'>
                        Результат поиска:
                    </Text>
                    {regions.map((region) => (
                        <li
                            key={region._id}
                            onClick={() => onSelect(region.region)}
                            className={styles.listItem}
                        >
                            <Text font='geometria500'>{region.region}</Text>
                        </li>
                    ))}
                </ul>
            ) : (
                <Text font='geometria500'>Ничего не найдено</Text>
            )}
        </Stack>
    );
};
