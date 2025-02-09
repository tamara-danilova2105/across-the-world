import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DayProgram, Tour } from "@/entities/Tours/model/types/types";
import { Button } from "@/shared/ui/Button";
import { ImageUploader } from "@/entities/ImageUploader";
import { TextEditor } from "@/entities/TextEditor";
import styles from './TourProgram.module.scss';
import { Image } from "@/shared/types/types";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

interface TourProgramProps {
    program: DayProgram[];
    setValue: UseFormSetValue<Tour>;
    errors: FieldErrors<Tour>;
}

export const TourProgram = (props: TourProgramProps) => {
    const { program, setValue, errors } = props;

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

    return (
        <Stack direction="column" gap="4">
            <Stack direction='column' gap='8' max>
                <Text size='18' font='geometria500'>
                    Программа тура
                </Text>

                {program.map((day, dayIndex) => (
                    <div key={dayIndex} className={styles.day}>
                        <div className={styles.dayHeader}>
                            <Text type='h3' size='18'>
                                День {dayIndex + 1}
                            </Text>
                            <button
                                type="button"
                                onClick={() => removeDay(dayIndex)}
                                className={styles.deleteButton}
                            >
                                ✕
                            </button>
                        </div>

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
