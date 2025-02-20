import { useMemo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Regions, TimerData } from "../../model/types/types";
import { useAddTimerMutation,
    useEditTimerMutation, 
    useGetTimerQuery, 
    useHideTimerMutation } from "@/widgets/EarlyBook/api/timerApi";
import { useGetRegionsQuery } from "@/entities/Region/api/api";
import { Loading } from "@/shared/ui/Loading";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { Eye, EyeOff, Upload } from "lucide-react";
import { Input } from "@/shared/ui/Input";
import { data, validateTextLength } from "@/shared/lib/validateInput";
import { Select } from "@/shared/ui/Select";
import { TimerImage } from "../TimerImage/TimerImage";
import styles from './EarlyBookEditor.module.scss' 

const INITIAL_TIMER_STATE: TimerData = {
    title: '',
    region: '',
    hide: true,
    discount: '',
    timer: '',
    imagesWithDetails: [],
};

export const EarlyBookEditor = () => {
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [timerData, setTimerData] = useState<TimerData>(INITIAL_TIMER_STATE);
    const [isHide, setIsHide] = useState<boolean>(timerData.hide ?? true);
    const methods = useForm({ mode: 'onSubmit', defaultValues: INITIAL_TIMER_STATE });
    const { register, handleSubmit, setValue, watch, getValues, reset, formState: { errors } } = methods;

    const { data: regions } = useGetRegionsQuery({});
    const { data: getTimer, isLoading: getLoading } = useGetTimerQuery({});
    const [addNewTimer, { isLoading: addTimerLoading }] = useAddTimerMutation();
    const [editTimer] = useEditTimerMutation();// error, load
    const [hideTimer, {isLoading: hideTimerLoading}] = useHideTimerMutation()

    const optionsRegions = useMemo(() => regions?.map(({ region }: Regions) => region) || [], [regions]);

    const getHideTimer = async () => {
        try {
            const changedHide = !isHide;
            await hideTimer({ hide: changedHide }).unwrap();
            setIsHide(changedHide);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        if (getTimer && getTimer.length > 0) {
            const currentTimer = getTimer[0];
            const formattedDate = new Date(currentTimer.timer).toISOString().split('T')[0];

            setValue('title', currentTimer.title);
            setValue('discount', currentTimer.discount);
            setValue('region', currentTimer.region);
            setValue('timer', formattedDate);

            setTimerData(prev => ({
                ...prev,
                imagesWithDetails: currentTimer.imagesWithDetails || []
            }))

            const images = currentTimer.imagesWithDetails || [];
            const cover_1 = images[0] || null;
            const cover_2 = images[1] || null;
    
            reset((prevValues) => ({
                ...prevValues,
                cover_1,
                cover_2
            }));
        }
    }, [getTimer, setValue, reset]);
    
    const onSubmit = async () => {
        const {title, region, discount, timer, imagesWithDetails} = getValues()
        
        if (imagesWithDetails.length !== 2) {
            return;
        }
    
        const data = new FormData();
        data.append("title", title);
        data.append("region", region);
        data.append("discount", discount || '');
        data.append("timer", timer || '');
        data.append("imagesWithDetails", JSON.stringify(imagesWithDetails));
    
        if (deletedImages.length > 0) {
            data.append("deletedImages", JSON.stringify(deletedImages));
        }

    
        imagesWithDetails.forEach(({ file }) => {
            if (file) data.append("photos", file);
        })

        try {
            if (getTimer && getTimer.length > 0) {
                await editTimer(data).unwrap();
            } else {
                await addNewTimer(data).unwrap();
            }
        } catch (error) {
            console.error("Ошибка сохранения таймера:", error);
        }
    }

    if (getLoading) return <Loading width="100" height="100" />;

    return (
            <Stack direction="column" align="center" max gap="24" 
                className={styles.timerContainer}
            >
                <Stack className={styles.header_admin}>
                    <Stack max direction="column" gap="32">
                        <Text type="h2" color="blue" 
                            font="geometria500" size="32"
                        >
                            Управление ранним бронированием
                        </Text>
                        <Stack max gap="32">
                            <Button type="button" color="outline" 
                                loading={hideTimerLoading} 
                                className={styles.button}
                                onClick={getHideTimer}
                            >
                                {isHide ? <Eye /> : <EyeOff />}
                                {isHide ? 'Опубликовать' : 'Снять с публикации'}
                            </Button>
                            <Button type="submit" loading={addTimerLoading} 
                                className={styles.button} onClick={handleSubmit(onSubmit)}
                            >
                                <Upload /> Сохранить таймер
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <FormProvider {...methods}>
                <form className={styles.form}>
                    <Input
                        label="Название объявления"
                        name="title"
                        register={register("title", {
                            required: data.required,
                            validate: (name: string) => validateTextLength(name, 5, 80)
                        })}
                        placeholder="Например: Открываем набор групп на КАМЧАТКУ 2025"
                        error={errors.title}
                        className={styles.input}
                    />
                    <Stack direction='column' gap="8" max>
                        <label className={styles.label}>Регион</label>
                        <Select 
                            value={watch("region")} 
                            options={optionsRegions} 
                            onChange={(option) => setValue('region', option)} 
                        />
                    </Stack>
                    <Stack max>
                        <Input
                            label="Дата окончания скидки"
                            name="timer"
                            type="date"
                            register={register("timer", { required: data.required })}
                            error={errors.timer}
                            className={styles.input}
                        />
                        <Input
                            label="Размер скидки"
                            name="discount"
                            type="number"
                            placeholder="8 %"
                            register={register("discount", { required: data.required })}
                            error={errors.discount}
                            className={styles.input}
                        />
                    </Stack>
                    <TimerImage 
                        setTimerData={setTimerData}
                        setDeletedImages={setDeletedImages}
                    />
                </form>
                </FormProvider>
            </Stack>
    );
};
