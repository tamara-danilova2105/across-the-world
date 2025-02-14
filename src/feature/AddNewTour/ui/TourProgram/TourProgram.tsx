import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DayProgram, Tour } from "@/entities/Tours/model/types/types";
import { Button } from "@/shared/ui/Button";
import { ImageUploader } from "@/entities/ImageUploader";
import { TextEditor } from "@/entities/TextEditor";
import styles from './TourProgram.module.scss';
import { Image } from "@/shared/types/types";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { getStyles } from "@/shared/lib/getStyles";

interface TourProgramProps {
    program: DayProgram[];
    errors: FieldErrors<Tour>;
    setValue: UseFormSetValue<Tour>;
    onDelete?: (id: string, src: string) => void;
}

export const TourProgram = (props: TourProgramProps) => {
    const { program, errors, setValue, onDelete } = props;

    const addDay = () => {
        setValue("program", [...program, { title: '', details: '', images: [] }]);
    };

    const updateDay = (index: number, field: keyof DayProgram, value: any) => {
        const newProgram = [...program];
        newProgram[index] = { ...newProgram[index], [field]: value };
        setValue("program", newProgram);
    };

    const removeDay = (index: number) => {
        setValue("program", program.filter((_, i) => i !== index));
    };

    const handleImagesChange = (dayIndex: number, newImages: Image[]) => {
        const newProgram = [...program];
        newProgram[dayIndex] = {
            ...newProgram[dayIndex],
            images: newImages.map(img => ({
                _id: img._id,
                src: img.src,
                file: img.file,
            }))
        };
        setValue("program", newProgram);
    };

    const moveDayUp = (index: number) => {
        if (index === 0) return;
        const newProgram = [...program];
        [newProgram[index], newProgram[index - 1]] = [newProgram[index - 1], newProgram[index]];
        setValue("program", newProgram);
    };

    const moveDayDown = (index: number) => {
        if (index === program.length - 1) return;
        const newProgram = [...program];
        [newProgram[index], newProgram[index + 1]] = [newProgram[index + 1], newProgram[index]];
        setValue("program", newProgram);
    };

    return (
        <Stack direction="column" gap="4">
            <Stack direction='column' gap='8' max>
                <Text size='18' font='geometria500'>
                    Программа тура
                </Text>

                {program.map((day, dayIndex) => (
                    <div key={dayIndex} className={styles.day}>
                        <Stack justify='between' align='center' className={styles.dayHeader}>
                            <Text type='h3' size='18'>
                                День {dayIndex + 1}
                            </Text>
                            <Stack gap="16" align='center'>
                                <span>Изменить порядок дней</span>
                                <button
                                    type="button"
                                    onClick={() => moveDayUp(dayIndex)}
                                    className={getStyles(styles.directionButton, { [styles.disabled]: dayIndex === 0 }, [])}
                                    disabled={dayIndex === 0}
                                >
                                    <ArrowUp />
                                </button>
                                <button
                                    type="button"
                                    className={getStyles(styles.directionButton, { [styles.disabled]: dayIndex === program.length - 1 }, [])}
                                    onClick={() => moveDayDown(dayIndex)}
                                    disabled={dayIndex === program.length - 1}
                                >
                                    <ArrowDown />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeDay(dayIndex)}
                                    className={styles.deleteButton}
                                >
                                    <Trash2 />
                                </button>
                            </Stack>
                        </Stack>

                        <Stack direction='column' gap="16" max>
                            <Stack
                                direction='column' gap="8"
                                className={styles.inputGroup}
                            >
                                <label className={styles.label}>Название дня</label>

                                <Stack direction='column' gap='4' max>
                                    <input
                                        type="text"
                                        value={day.title}
                                        onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                                        placeholder="Например: Прибытие"
                                        className={errors.program?.[dayIndex]?.title ? styles.error : undefined}
                                    />
                                    {errors.program?.[dayIndex]?.title && (
                                        <Text color="red">{errors.program[dayIndex].title.message}</Text>
                                    )}
                                </Stack>

                            </Stack>

                            <Stack
                                direction='column' gap="8"
                                className={styles.inputGroup}
                            >
                                <label className={styles.label}>Описание дня</label>

                                <Stack direction='column' gap='4' max>
                                    <TextEditor
                                        initialContent={day.details}
                                        onChange={(value) => updateDay(dayIndex, 'details', value)}
                                        isError={!!errors.program?.[dayIndex]?.details}
                                    />
                                    {errors.program?.[dayIndex]?.details && (
                                        <Text color="red">{errors.program[dayIndex].details.message}</Text>
                                    )}
                                </Stack>
                            </Stack>

                            <Stack
                                direction='column' gap="8"
                                className={styles.inputGroup}
                            >
                                <label className={styles.label}>Фотографии</label>
                                <ImageUploader
                                    images={day.images?.map(img => ({
                                        _id: img._id,
                                        src: img.src,
                                        file: img.file,
                                    })) || []}
                                    onChange={(images) => handleImagesChange(dayIndex, images)}
                                    onDelete={onDelete}
                                    maxImages={3}
                                />
                            </Stack>
                        </Stack>
                    </div>
                ))}

                <div>
                    <Button
                        type="button"
                        color='transparent'
                        onClick={addDay}
                    >
                        + Добавить день
                    </Button>
                </div>
            </Stack >

            {errors.program && !Array.isArray(errors.program) && (
                <Text color="red">{errors.program.message}</Text>
            )}
        </Stack>
    );
};
