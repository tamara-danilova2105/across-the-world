import { useState } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { Search, X } from 'lucide-react';
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { data, textRegex } from "@/shared/lib/validateInput";
import styles from "./RegionTours.module.scss";

interface PlaceholderTypes {
    placeholder?: string
}

export const RegionTours = ({placeholder} : PlaceholderTypes) => {
    const [showRegionsList, setShowRegionsList] = useState(false);
    const { register, setValue, watch, formState: { errors } } = useFormContext();

    const regionValue = watch('region');

    const handleClearRegion = () => {
        setValue('region', '')
    }

    const handleRegionSelect = (regionName: string) => {
        setValue('region', regionName)
        setShowRegionsList(false)
    };

    const searchIcon = regionValue 
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button"/> 
        : <Search />

    return (
        <Stack 
            direction='column' 
            max
            className={styles.search}
        >
            <Stack className={styles.svg}>
                {searchIcon}
            </Stack>
            <Input 
                name="region"
                register={register('region', {
                    required: data.required,
                    pattern: {
                        value: textRegex,
                        message: data.errors.validName
                    }
                })}
                placeholder={placeholder ? placeholder : "Куда отправляемся?"}
                error={errors?.region as FieldError | undefined}
                onFocus={() => setShowRegionsList(true)}
            />
            {showRegionsList && 
                <Stack
                    direction='column'
                    className={styles.list}
                    gap='16'
                >
                    <ul>
                        <Text 
                            type='h2' 
                            font='geometria500'
                            size='16'
                        >Результат поиска:</Text>
                        <li onClick={() => handleRegionSelect('Байкал')}>
                            <Text font='geometria500'>Байкал</Text>
                            <Text 
                                font='geometria500'
                                className={styles.span}
                            >23</Text>
                        </li>
                    </ul>
                    <ul>
                        <Text 
                            type='h2' 
                            font='geometria500'
                            size='16'
                        >Популярное:</Text>
                        <li>
                            <Text font='geometria500'>Байкал</Text>
                            <Text 
                                font='geometria500'
                                className={styles.span}
                            >23</Text>
                        </li>
                    </ul>
                </Stack>}
        </Stack>
    )
}