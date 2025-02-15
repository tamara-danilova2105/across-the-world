import { useMemo, useState, useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ImagesWithDetails, TimerData } from "../../model/types/types";
import { useAddTimerMutation, useEditTimerMutation, useGetTimerQuery } from "@/widgets/EarlyBook/api/timerApi";
import { useGetRegionsQuery } from "@/entities/Region/api/api";
import { Regions } from "@/entities/Tours";
import { TimerForm } from "../TimerForm/TimerForm";
import { useParams } from "react-router";

const INITIAL_TIMER_STATE: TimerData = {
    title: '',
    region: '',
    hide: true,
    description: '',
    timer: '',
    imagesWithDetails: [],
};

export const AddNewTimerMain = () => {
    const { id } = useParams()
    const [deletedImages, setDeletedImages] = useState<string[]>([]); //TODO
    const [timerData, setTimerData] = useState(INITIAL_TIMER_STATE);
    const methods = useForm({ mode: 'onSubmit', defaultValues: INITIAL_TIMER_STATE });
    const { register, handleSubmit, setValue, reset, formState: { errors } } = methods;

    console.log(deletedImages)

    const { data: regions } = useGetRegionsQuery({});
    const { data: getTimer, isLoading: getLoading, error: errorTimer } = useGetTimerQuery({})

    console.log(getTimer)

    const [addNewTimer, { isLoading: addTimerLoading }] = useAddTimerMutation()
    const [editTimer, { error: editError, isLoading: editTimerLoading }] = useEditTimerMutation()
    console.log(editTimer, editError, editTimerLoading)

    console.log(getTimer, errorTimer, getLoading)

    const optionsRegions = useMemo(() => regions?.map(({ region }: Regions) => region) || [], [regions]);

    useEffect(() => {
        if (getTimer && getTimer.length > 0) {
            const currentTimer = getTimer[0];
            const formattedDate = new Date(currentTimer.timer).toISOString().split('T')[0];

            setValue('title', currentTimer.title);
            setValue('description', currentTimer.description);
            setValue('timer', formattedDate);

            setTimerData(prev => ({
                ...prev,
                region: currentTimer.region,
                hide: currentTimer.hide,
                imagesWithDetails: currentTimer.imagesWithDetails || []
            }))
        }
    }, [getTimer, setValue]);

    const handleSaveCover = useCallback((newCover: ImagesWithDetails) => {
        setTimerData(prev => prev.imagesWithDetails.length < 2 ? {
            ...prev,
            imagesWithDetails: [...prev.imagesWithDetails, newCover]
        } : prev)
    }, [])

    const handleRegionChange = useCallback((option: string) => {
        setTimerData(prev => ({ ...prev, region: option }));
    }, [])

    const handleHideChange = useCallback((hide: boolean) => {
        setTimerData(prev => ({ ...prev, hide: hide }));
    }, [])

    const onSubmit = async (formData: TimerData) => {
        const { imagesWithDetails, region, hide } = timerData;

        if (imagesWithDetails.length !== 2) return;

        const data = {
            title: formData.title,
            region,
            description: formData.description,
            hide,
            timer: formData.timer,
            imagesWithDetails: JSON.stringify(imagesWithDetails),
        }

        // imagesWithDetails.forEach(({ file }) => {
        //     if (file) data.append('photos', file);
        // });

        console.log(data)

        try {
            await addNewTimer(data).unwrap()
            setTimerData(INITIAL_TIMER_STATE);
            reset();
        } catch (error) {
            console.error(id ? 'Ошибка редактирования таймера:' : 'Ошибка добавления таймера:', error);
        }
    }

    return (
        <FormProvider {...methods}>
            <TimerForm
                register={register}
                errors={errors}
                timerData={timerData}
                setTimerData={setTimerData}
                setDeletedImages={setDeletedImages}
                optionsRegions={optionsRegions}
                handleSaveCover={handleSaveCover}
                onRegionChange={handleRegionChange}
                onHideChange={handleHideChange}
                isLoading={addTimerLoading}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
            />
        </FormProvider>
    )
}