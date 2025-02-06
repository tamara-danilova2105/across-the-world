import { useState } from "react";
import { FormProvider, useForm, get } from "react-hook-form";
import { Input } from "@/shared/ui/Input";
import { TextArea } from "@/shared/ui/TextArea";
import { TimerImage } from "../TimerImage/TimerImage";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { data } from "@/shared/lib/validateInput";
import styles from './AddNewTimerMain.module.scss';
import { ImagesWithDetails, TimerData } from "../../types/types";
import { Button } from "@/shared/ui/Button";
import { RegionTours } from "@/feature/SearchTours/ui/RegionTours/RegionTours/RegionTours";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGetRegionsQuery } from "@/entities/Region/api/api";
import { useAddTimerMutation } from "@/widgets/EarlyBook/api/timerApi";
import { TimerReady } from "../Timer/TimerReady";

const INITIAL_TIMER_STATE: TimerData = {
    title: '',
    region: '',
    description: '',
    timer: '',
    imagesWithDetails: [],
    }

export const AddNewTimerMain = () => {
    const [timerData, setTimerData] = useState<TimerData>(INITIAL_TIMER_STATE);

    const methods = useForm<TimerData>({ 
        mode: 'onSubmit',
        defaultValues: INITIAL_TIMER_STATE})

    const { register, handleSubmit, reset, watch, formState: { errors } } = methods;
    const regionValue = watch('region')

    const debouncedSearch = useDebounce({ value: regionValue, delay: 300 })

    const { data: regions, error: regionsError, 
        isLoading: regionsLoading } = useGetRegionsQuery({
        search: debouncedSearch})
    
    const [addNewTimer, { error: addTimerError,
        isLoading: addTimerLoading }] = useAddTimerMutation()

    console.log(addTimerError)

    const handleSaveCover = (newCover: ImagesWithDetails) => {
        setTimerData((prev) => {
            if (prev.imagesWithDetails.length >= 2) return prev;
    
            return {
                ...prev,
                imagesWithDetails: [...prev.imagesWithDetails, newCover]
            }
        })
    }
    const onSubmit = async (formData: TimerData) => {
        if (timerData.imagesWithDetails.length !== 2) {
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('region', formData.region);
        data.append('description', formData.description);
        data.append('timer', formData.timer);
        data.append('imagesWithDetails', JSON.stringify(timerData.imagesWithDetails));
        timerData.imagesWithDetails.forEach((image) => {
            console.log(image.file)
            if (image.file) {
                data.append('photos', image.file);
            }
        })

        try {
            await addNewTimer(data).unwrap();
            setTimerData(INITIAL_TIMER_STATE);
            reset()
        } catch (e) {
            console.error('Ошибка добавления таймера:', e)
        }
    }

    return (
        <FormProvider {...methods}>
            <Stack direction="column" className={styles.timerContainer} gap="24">
                <TimerReady/>
                <Text type="h2" color="blue" font="geometria500" size="32">
                    Добавить новый таймер
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Название объявления"
                        name="title"
                        register={register("title", { required: data.required })}
                        placeholder="Например: `Открываем набор групп на КАМЧАТКУ 2025`"
                        error={get(errors, "title")}
                    />
                    <RegionTours
                        regions={regions}
                        error={regionsError}
                        isLoading={regionsLoading}
                        placeholder="Введите аукционный регион"/>
                    <TextArea
                        label="Описание акции"
                        name="description"
                        register={register("description", { required: data.required })}
                        placeholder="Например: `При бронировании до 1 декабря действует скидка 8% по акции раннего бронирования.`"
                        error={get(errors, "description")}
                    />
                    <Input
                        label="Дата окончания таймера"
                        name="timer"
                        type="date"
                        register={register("timer", { required: data.required })}
                        error={get(errors, "timer")}
                    />
                    <TimerImage
                        imagesWithDetails={timerData.imagesWithDetails}
                        handleSaveCover={handleSaveCover}
                    />
                    <Button type="submit" loading={addTimerLoading}>
                        Сохранить таймер
                    </Button>
                </form>
            </Stack>
        </FormProvider>
    )
}