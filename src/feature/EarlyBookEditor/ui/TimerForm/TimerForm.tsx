import { get, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "@/shared/ui/Input";
import { TimerImage } from "../TimerImage/TimerImage";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { data, validateTextLength } from "@/shared/lib/validateInput";
import styles from './TimerForm.module.scss';
import { ImagesWithDetails, TimerData } from "../../model/types/types";
import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";
import { Eye, EyeOff, Upload } from "lucide-react";

interface TimerFormProps {
    register: any;
    errors: any;
    timerData: TimerData;
    setTimerData: React.Dispatch<React.SetStateAction<TimerData>>;
    setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
    optionsRegions: string[];
    handleSaveCover: (newCover: ImagesWithDetails) => void;
    onRegionChange: (option: string) => void;
    onHideChange: (hide: boolean) => void;
    isLoading: boolean;
    onSubmit: (data: TimerData) => Promise<void>;
    handleSubmit: UseFormHandleSubmit<TimerData>;
}

export const TimerForm = ({
    register,
    errors,
    timerData,
    setTimerData,
    setDeletedImages,
    optionsRegions,
    handleSaveCover,
    onRegionChange,
    onHideChange,
    isLoading,
    onSubmit,
    handleSubmit
}: TimerFormProps) => {

    const hide_timer = (
        <Button 
            type="submit" 
            color="outline"
            loading={isLoading}
            className={styles.button}
            onClick={handleSubmit(() => onHideChange(true))}
        >
            <EyeOff /> Снять с публикации
        </Button>
    );
    
    const add_timer = (
        <Button 
            type="submit" 
            color="outline"
            loading={isLoading}
            className={styles.button}
            onClick={handleSubmit(() => onHideChange(false))}
        >
            <Eye /> Опубликовать
        </Button>
    );
    
    const control_timer = timerData?.hide ? add_timer : hide_timer;

    return (
        <Stack direction="column" align="center"
            max gap="24" className={styles.timerContainer}
        >
            <Stack className={styles.header_admin}
            >
                <Stack max direction="column" gap="32">
                    <Text type="h2" color="blue" 
                        font="geometria500" size="32"
                    >
                        Управление ранним бронированием
                    </Text>
                    <Stack max gap="32">
                        {control_timer}
                        <Button type="submit" loading={isLoading}
                            className={styles.button}
                            onClick={handleSubmit(onSubmit)}
                        >
                            <Upload /> Сохранить таймер
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <form className={styles.form}>
                <Input
                    label="Название объявления"
                    name="title"
                    register={register("title", { 
                        required: data.required, 
                        validate: (name: string) => validateTextLength(name, 5, 40) 
                    })}
                    placeholder="Например: Открываем набор групп на КАМЧАТКУ 2025"
                    error={get(errors, "title")}
                    className={styles.input}
                />

                <Stack direction='column' gap="8" max>
                    <label className={styles.label}>
                        Регион
                    </label>
                    <Select
                        value={timerData.region ? timerData.region : "Выбрать регион"}
                        options={optionsRegions}
                        onChange={onRegionChange}
                    />
                </Stack>
                <Stack max>
                    <Input
                        label="Дата окончания скидки"
                        name="timer"
                        type="date"
                        register={register("timer", { required: data.required })}
                        error={get(errors, "timer")}
                        className={styles.input}
                    />
                    <Input
                        label="Размер скидки"
                        name="discount"
                        type="number"
                        placeholder="8 %"
                        register={register("discount", { required: data.required })}
                        error={get(errors, "discount")}
                        className={styles.input}
                    />
                </Stack>
                <TimerImage
                    imagesWithDetails={timerData.imagesWithDetails}
                    handleSaveCover={handleSaveCover}
                    setTimerData={setTimerData}
                    setDeletedImages={setDeletedImages}
                />
            </form>
        </Stack>
    )
}
