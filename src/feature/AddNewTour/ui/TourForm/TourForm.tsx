import { Stack } from "@/shared/ui/Stack";
import { Tour } from "@/widgets/OurTours/lib/data"; //TODO public api
import { useState } from "react";
import styles from './TourForm.module.scss';
import { DateRangeInput } from "../DateRangeInput/DateRangeInput";

export const TourForm = () => {

    const [formData, setFormData] = useState<Tour>({
        _id: '',
        tour: '',
        dates: [],
        locations: {
            place_start: '',
            place_finish: '',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        image: '',
        direction: 'Россия',
        region: 'Russia',
        counrty: 'Kamchatka',
        activity: 'Для всех',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
    });
    
    return (
        <Stack 
            direction='column' gap="16"
            className={styles.container}
        >
            <form>
                <Stack direction='column' gap="8">
                    <label>Название тура</label>
                    <input
                        type="text"
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                        placeholder="Например: Южная Америка: Патагония"
                    />
                </Stack>

                <DateRangeInput
                    dates={formData.dates}
                    onChange={(dates) => setFormData({ ...formData, dates })}
                />
            </form>
        </Stack>
    );
};