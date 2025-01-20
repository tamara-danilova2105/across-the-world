import { Stack } from "@/shared/ui/Stack";
import { ActivityLevel, ComfortType, DirectionTour, Tour } from "@/widgets/OurTours/lib/data"; //TODO public api
import { useState } from "react";
import styles from './TourForm.module.scss';
import { DateRangeInput } from "../DateRangeInput/DateRangeInput";
import { LocationsInput } from "../LocationsInput/LocationsInput";
import { OptionsSelect } from "../OptionsSelect/OptionsSelect";
import { RichEditor } from "../RichEditor/RichEditor";
import { DetailsInput } from "../DetailsInput/DetailsInput";
import { ProgramInput } from "../ProgramInput/ProgramInput";
import { HotelsInput } from "../HotelsInput/HotelsInput";

const activityOptions: ActivityLevel[] = ['Для всех', 'Низкий', 'Средний', 'Высокий', 'Очень высокий'];
const comfortOptions: ComfortType[] = ['Высокий', 'Уникальное жилье', 'Средний'];
const directionOptions: DirectionTour[] = ["Россия", "Заграница"];

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

    console.log(formData);

    return (
        <Stack
            direction='column' gap="16"
            className={styles.container}
        >
            <form>
                <Stack direction='column' gap="8">
                    <label className={styles.label}>
                        Название тура
                    </label>
                    <input
                        type="text"
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                        placeholder="Например: Южная Америка: Патагония"
                        className={styles.input}
                    />
                </Stack>

                <DateRangeInput
                    dates={formData.dates}
                    onChange={(dates) => setFormData({ ...formData, dates })}
                />

                <LocationsInput
                    locations={formData.locations}
                    onChange={(locations) => setFormData({ ...formData, locations })}
                />

                <Stack direction='column' gap="8">
                    <label className={styles.label}>
                        Направление
                    </label>
                    <OptionsSelect
                        value={formData.direction}
                        options={directionOptions}
                        onChange={(option: DirectionTour) => setFormData({ ...formData, direction: option })}
                    />
                </Stack>

                <Stack direction='column' gap="8">
                    <label className={styles.label}>
                        Уровень активности
                    </label>
                    <OptionsSelect
                        value={formData.activity}
                        options={activityOptions}
                        onChange={(option: ActivityLevel) => setFormData({ ...formData, activity: option })}
                    />
                </Stack>

                <Stack direction='column' gap="8">
                    <label className={styles.label}>
                        Уровень комфорта
                    </label>
                    <OptionsSelect
                        value={formData.comfort}
                        options={comfortOptions}
                        onChange={(option: ComfortType) => setFormData({ ...formData, comfort: option })}
                    />
                </Stack>

                <Stack direction='column' gap="8">
                    <label className={styles.label}>
                        Описание тура
                    </label>
                    <div className={styles.editor_container}>
                        <RichEditor
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            placeholder="Опишите тур..."
                        />
                    </div>
                </Stack>

                <DetailsInput
                    details={formData.details}
                    onChange={(details) => setFormData({ ...formData, details })}
                />

                <ProgramInput
                    program={formData.program}
                    onChange={(program) => setFormData({ ...formData, program })}
                />

                <HotelsInput
                    images={formData.hotels}
                    onChange={(hotels) => setFormData({ ...formData, hotels })}
                />
            </form>
        </Stack>
    );
};