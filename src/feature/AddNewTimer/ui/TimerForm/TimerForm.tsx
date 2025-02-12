import { get, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "@/shared/ui/Input";
import { TextArea } from "@/shared/ui/TextArea";
import { TimerImage } from "../TimerImage/TimerImage";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { data, validateTextLength } from "@/shared/lib/validateInput";
import styles from './TimerForm.module.scss';
import { ImagesWithDetails, TimerData } from "../../types/types";
import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";

interface TimerFormProps {
    register: any;
    errors: any;
    timerData: TimerData;
    setTimerData: React.Dispatch<React.SetStateAction<TimerData>>;
    setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
    optionsRegions: string[];
    handleSaveCover: (newCover: ImagesWithDetails) => void;
    onRegionChange: (option: string) => void;
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
    isLoading,
    onSubmit,
    handleSubmit
}: TimerFormProps) => {

    return (
        <Stack direction="column" align="center"
            max gap="24" className={styles.timerContainer}
        >
            <form onSubmit={handleSubmit(onSubmit)}
                className={styles.form}>
                <Stack justify="between" max>
                    <Text type="h2" color="blue" 
                        font="geometria500" size="32"
                    >
                        Добавить новый таймер
                    </Text>
                    <Button type="submit" loading={isLoading}
                        className={styles.button}
                    >
                        Сохранить таймер
                    </Button>
                </Stack>
                <Input
                    label="Название объявления"
                    name="title"
                    register={register("title", { 
                        required: data.required, 
                        validate: (name: string) => validateTextLength(name, 5, 30) 
                    })}
                    placeholder="Например: `Открываем набор групп на КАМЧАТКУ 2025`"
                    error={get(errors, "title")}
                    className={styles.input}
                />

                <Stack direction='column' gap="8" max>
                    <label className={styles.label}>
                        Регион
                    </label>
                    <Select
                        value={timerData.region}
                        options={optionsRegions}
                        onChange={onRegionChange}
                    />
                </Stack>
                <TextArea
                    label="Описание акции"
                    name="description"
                    register={register("description", { 
                        required: data.required, 
                        validate: (name: string) => validateTextLength(name, 10, 300) 
                    })}
                    placeholder="Например: `При бронировании до 1 декабря действует скидка 8% по акции раннего бронирования.`"
                    error={get(errors, "description")}
                />
                <Input
                    label="Дата окончания таймера"
                    name="timer"
                    type="date"
                    register={register("timer", { required: data.required })}
                    error={get(errors, "timer")}
                    className={styles.input}
                />
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
