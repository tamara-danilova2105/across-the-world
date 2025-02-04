import { useState } from "react";
import { FormProvider, useForm, get } from "react-hook-form";
import { Input } from "@/shared/ui/Input";
import { TextArea } from "@/shared/ui/TextArea";
import { TimerImage } from "../TimerImage/TimerImage";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { data } from "@/shared/lib/validateInput";
import styles from './AddNewTimerMain.module.scss';
import { Details, TimerData } from "../../types/types";
import { Button } from "@/shared/ui/Button";
import { Image } from "@/shared/types/types";
import { RegionTours } from "@/feature/SearchTours/ui/RegionTours/RegionTours/RegionTours";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGetRegionsQuery } from "@/entities/Region/api/api";

const INITIAL_TIMER_STATE: TimerData = {
    _id: crypto.randomUUID(),
    title: '',
    region: '',
    description: '',
    timer: '',
    imagesWithDetails: {
        images: [],
        details: []
    },
}

export const AddNewTimerMain = () => {
    const [timerData, setTimerData] = useState<TimerData>(INITIAL_TIMER_STATE);

    const methods = useForm<TimerData>({ 
        mode: 'onSubmit',
        defaultValues: {
            title: '',
            region: '',
            description: '',
            timer: '',
            imagesWithDetails: {
                images: [],
                details: []
            }
        }
    });
    

    const { register, handleSubmit, reset, watch, formState: { errors } } = methods;

    const regionValue = watch('region')

    const debouncedSearch = useDebounce({ value: regionValue, delay: 300 })
    const { data: regions, error, isLoading } = useGetRegionsQuery({
        search: debouncedSearch})

        console.log(regions, error, isLoading)

    const handleSaveCover = (newCover: { images: Image[], details: Details[]} | {}) => {
        setTimerData((prev: TimerData ) => {
        if (prev.imagesWithDetails.images.length >= 2) {
            return prev
        } 
        console.log(prev, newCover)
        return {
            ...prev,
            imagesWithDetails: {
            images: [...prev.imagesWithDetails.images, newCover.image],
            details: [...prev.imagesWithDetails.details, newCover.details]
            }
        }
        })
    }

    const onSubmit = (formData: TimerData) => {
        if (formData.imagesWithDetails.images.length !== 2) {
            return
        }
        reset()
        setTimerData(INITIAL_TIMER_STATE)
    }

    return (
        <FormProvider {...methods}>
            <Stack direction="column" className={styles.timerContainer} gap="24">
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
                        error={error}
                        isLoading={isLoading}
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
                    <Button type="submit">
                        Сохранить таймер
                    </Button>
                </form>
            </Stack>
        </FormProvider>
    )
}