import { useState } from "react";
import { ActivityLevel, ComfortType, Countries, DirectionTour, Regions, Tour, TypeTour } from "@/widgets/OurTours/lib/data"; //TODO public api
import { AdminMap } from "@/entities/Mapbox";
import { Stack } from "@/shared/ui/Stack";
import { DateRangeInput } from "../DateRangeInput/DateRangeInput";
import { LocationsInput } from "../LocationsInput/LocationsInput";
import { OptionsSelect } from "../OptionsSelect/OptionsSelect";
import { RichEditor } from "../RichEditor/RichEditor";
import { DetailsInput } from "../DetailsInput/DetailsInput";
import { ProgramInput } from "../ProgramInput/ProgramInput";
import { HotelsInput } from "../HotelsInput/HotelsInput";
import styles from './TourForm.module.scss';
import { Text } from "@/shared/ui/Text";
import { DiscountInput } from "../DiscountInput/DiscountInput";

const activityOptions: ActivityLevel[] = ['Для всех', 'Низкий', 'Средний', 'Высокий', 'Очень высокий'];
const comfortOptions: ComfortType[] = ['Высокий', 'Уникальное жилье', 'Средний'];
const directionOptions: DirectionTour[] = ["Россия", "Заграница"];
const typeTourOptions: TypeTour[] = ['Трекинг', 'Ретрит / оздоровительный', 'Экскурсионный', 'Детский', 'Фототур'];
const regionsOptions: Regions[] = ['Russia', 'Middle_East', 'Asia', 'South_America', 'Africa']
const countriesOptions: Countries[] = [
    'North_Caucasus', 'Kamchatka', 'Baikal', 'Kalmykia', 'Karelia',
    'Armenia', 'Iran', 'Turkey', 'Georgia', 'Socotra', 'Azerbaijan', 'Uzbekistan', 'Pakistan',
    'Japan', 'Argentina', 'Brazil', 'Peru', 'Chile', 'Bolivia'
];


export const TourForm = () => {

    const [formData, setFormData] = useState<Tour>({
        _id: '',
        type: 'Экскурсионный',
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
            direction='column' gap="24"
            className={styles.container}
        >
            <Text type='h2' size='32' color='blue' font='geometria600'>
                Создать новый тур
            </Text>

            <form>
                <Stack direction='column' gap="16">
                    <Text size='18' font='geometria500'>
                        Название тура
                    </Text>
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

                <DiscountInput
                    discount={formData.discount}
                    onChange={(discount) => setFormData({ ...formData, discount })}
                />


                <LocationsInput
                    locations={formData.locations}
                    onChange={(locations) => setFormData({ ...formData, locations })}
                />

                <Stack direction='column' gap='16'>
                    <Text size='18' font='geometria500'>
                        Опции тура
                    </Text>

                    <Stack gap="24">
                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Регион
                            </label>
                            <OptionsSelect
                                value={formData.region}
                                options={regionsOptions}
                                isTransleteText
                                onChange={(option: Regions) => setFormData({ ...formData, region: option })}
                            />
                        </Stack>

                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Страна
                            </label>
                            <OptionsSelect
                                value={formData.counrty}
                                options={countriesOptions}
                                isTransleteText
                                onChange={(option: Countries) => setFormData({ ...formData, counrty: option })}
                            />
                        </Stack>
                    </Stack>

                    <Stack gap="24">
                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Типа тура
                            </label>
                            <OptionsSelect
                                value={formData.type}
                                options={typeTourOptions}
                                onChange={(option: TypeTour) => setFormData({ ...formData, type: option })}
                            />
                        </Stack>

                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Направление
                            </label>
                            <OptionsSelect
                                value={formData.direction}
                                options={directionOptions}
                                onChange={(option: DirectionTour) => setFormData({ ...formData, direction: option })}
                            />
                        </Stack>
                    </Stack>

                    <Stack gap="24">
                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Уровень активности
                            </label>
                            <OptionsSelect
                                value={formData.activity}
                                options={activityOptions}
                                onChange={(option: ActivityLevel) => setFormData({ ...formData, activity: option })}
                            />
                        </Stack>

                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Уровень комфорта
                            </label>
                            <OptionsSelect
                                value={formData.comfort}
                                options={comfortOptions}
                                onChange={(option: ComfortType) => setFormData({ ...formData, comfort: option })}
                            />
                        </Stack>
                    </Stack>
                </Stack>

                <Stack direction='column' gap="16">
                    <Text size='18' font='geometria500'>
                        Описание тура
                    </Text>

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

                <Stack direction='column' gap="16">
                    <Text size='18' font='geometria500'>
                        Карта тура
                    </Text>
                    <AdminMap />
                </Stack>
            </form>
        </Stack>
    );
};