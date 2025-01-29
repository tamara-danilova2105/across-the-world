import { useState } from "react";
import { ActivityLevel, ComfortType, DirectionTour, Tour, TypeTour } from "@/widgets/OurTours/lib/data"; //TODO public api
import { Stack } from "@/shared/ui/Stack";
import { DateRangeInput } from "../DateRangeInput/DateRangeInput";
import { LocationsInput } from "../LocationsInput/LocationsInput";
import { DetailsInput } from "../DetailsInput/DetailsInput";
import { ProgramInput } from "../ProgramInput/ProgramInput";
import { HotelsInput } from "../HotelsInput/HotelsInput";
import { Text } from "@/shared/ui/Text";
import { DiscountInput } from "../DiscountInput/DiscountInput";
import { MapMarkerInput } from "../MapMarkerInput/MapMarkerInput";
import { useModal } from "@/shared/hooks/useModal";
import { AddNewRegion } from "../AddNewRegion/AddNewRegion";
import { Button } from "@/shared/ui/Button";
import { ImageCoverInput } from "../ImageCoverInput/ImageCoverInput";
import { TextEditor } from "@/entities/TextEditor";
import { MultiSelect } from "@/shared/ui/MultiSelect";
import { Select } from "@/shared/ui/Select";
import styles from './TourForm.module.scss';

const activityOptions: ActivityLevel[] = ['Для всех', 'Низкий', 'Средний', 'Высокий', 'Очень высокий'];
const comfortOptions: ComfortType[] = ['Высокий', 'Уникальное жилье', 'Средний'];
const directionOptions: DirectionTour[] = ["Россия", "Заграница"];
const typeTourOptions: TypeTour[] = ['Трекинг', 'Ретрит / оздоровительный', 'Экскурсионный', 'Детский', 'Фототур'];

//TODO - запрос регионов делать 
const regionsRussiaOptions = ['North_Caucasus', 'Kamchatka', 'Baikal', 'Kalmykia', 'Karelia']
const regionsWorldOptions = [
    'Armenia', 'Iran', 'Turkey', 'Georgia', 'Socotra', 'Azerbaijan', 'Uzbekistan', 'Pakistan',
    'Japan', 'Argentina', 'Brazil', 'Peru', 'Chile', 'Bolivia'
];


// const regionsList = [
//     { direction: 'Россия', region: 'Байкал' },
//     { direction: 'Россия', region: 'Камчатка' },
//     { direction: 'Заграница', region: 'Япония' },
//     { direction: 'Заграница', region: 'Турция' }
// ];


export const TourForm = () => {

    const [formData, setFormData] = useState<Tour>({
        _id: crypto.randomUUID(),
        types: [],
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
        imageCover: [],
        direction: 'Россия', //TODO - мне не нравится, что здесь массив, когда по сути только 1 значение
        regions: [],
        activity: 'Для всех',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
    });

    console.log(formData);


    const [changeModal, drawModal] = useModal();

    return (
        <>
            {drawModal(<AddNewRegion direction={formData.direction} />)}

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

                    <ImageCoverInput
                        images={formData.imageCover}
                        onChange={(imageCover) => setFormData({ ...formData, imageCover })}
                    />

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

                    <Stack direction='column' gap='16' max>
                        <Text size='18' font='geometria500'>
                            Опции тура
                        </Text>

                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Направление
                            </label>
                            <Select
                                value={formData.direction}
                                options={directionOptions}
                                onChange={(option: DirectionTour) => setFormData({ ...formData, direction: option, regions: [] })}
                            />
                        </Stack>

                        {formData.direction.length !== 0 && (
                            <Stack direction='column' gap="8" max>
                                <label className={styles.label}>
                                    {formData.direction === 'Россия' ? 'Регионы' : 'Страны'}
                                </label>
                                <MultiSelect
                                    value={formData.regions}
                                    options={formData.direction === 'Россия' ? regionsRussiaOptions : regionsWorldOptions}
                                    onChange={(option: string[]) => setFormData({ ...formData, regions: option })}
                                />
                                <div>
                                    <Button
                                        type="button"
                                        color='transparent'
                                        onClick={changeModal}
                                        className={styles.addButton}
                                    >
                                        + Добавить новый регион/страну
                                    </Button>
                                </div>
                            </Stack>
                        )}

                        <Stack direction='column' gap="8" max>
                            <label className={styles.label}>
                                Типа тура
                            </label>
                            <MultiSelect
                                value={formData.types}
                                options={typeTourOptions}
                                onChange={(option: TypeTour[]) => setFormData({ ...formData, types: option })}
                            />
                        </Stack>

                        <Stack gap="24" max>
                            <Stack direction='column' gap="8" max>
                                <label className={styles.label}>
                                    Уровень активности
                                </label>
                                <Select
                                    value={formData.activity}
                                    options={activityOptions}
                                    onChange={(option: ActivityLevel) => setFormData({ ...formData, activity: option })}
                                />
                            </Stack>

                            <Stack direction='column' gap="8" max>
                                <label className={styles.label}>
                                    Уровень комфорта
                                </label>
                                <Select
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

                        <TextEditor
                            initialContent={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                        />
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

                    <MapMarkerInput
                        markers={formData.mapMarker}
                        onChange={(markers) => setFormData({ ...formData, mapMarker: markers })}
                    />
                </form>
            </Stack>
        </>
    );
};