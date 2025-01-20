import { DayProgram } from "@/widgets/OurTours/lib/data";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { RichEditor } from "../RichEditor/RichEditor";
import styles from './ProgramInput.module.scss';
import { ImageUploader } from "@/entities/ImageUploader";

interface ProgramInputProps {
    program: DayProgram[];
    onChange: (program: DayProgram[]) => void;
}

export const ProgramInput = (props: ProgramInputProps) => {
    const { program, onChange } = props;

    const addDay = () => {
        onChange([...program, { title: '', details: '', images: [] }]);
    };

    const updateDay = (index: number, field: keyof DayProgram, value: any) => {
        const newProgram = [...program];
        newProgram[index] = { ...newProgram[index], [field]: value };
        onChange(newProgram);
    };

    const removeDay = (index: number) => {
        onChange(program.filter((_, i) => i !== index));
    };

    const addImage = (dayIndex: number) => {
        const newProgram = [...program];
        if (!newProgram[dayIndex].images) {
            newProgram[dayIndex].images = [];
        }
        newProgram[dayIndex].images?.push({ _id: '', src: '', alt: '' });
        onChange(newProgram);
    };

    const updateImage = (dayIndex: number, imageIndex: number, field: 'src' | 'alt', value: string) => {
        const newProgram = [...program];
        if (newProgram[dayIndex].images) {
            newProgram[dayIndex].images![imageIndex] = {
                ...newProgram[dayIndex].images![imageIndex],
                [field]: value,
            };
            onChange(newProgram);
        }
    };

    const removeImage = (dayIndex: number, imageIndex: number) => {
        const newProgram = [...program];
        if (newProgram[dayIndex].images) {
            newProgram[dayIndex].images = newProgram[dayIndex].images!.filter((_, i) => i !== imageIndex);
            onChange(newProgram);
        }
    };

    return (
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
                            <label>Название дня</label>
                            <input
                                type="text"
                                value={day.title}
                                onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                                placeholder="Например: День 1. Прибытие"
                            />
                        </Stack>

                        <Stack
                            direction='column' gap="8"
                            className={styles.inputGroup}
                        >
                            <label>Описание дня</label>
                            <div className={styles.richEditorContainer}>
                                <RichEditor
                                    value={day.details}
                                    onChange={(value) => updateDay(dayIndex, 'details', value)}
                                    placeholder="Опишите программу дня..."
                                />
                            </div>
                        </Stack>

                        <Stack
                            direction='column' gap="8"
                            className={styles.inputGroup}
                        >
                            <label>Фотографии</label>
                            {day.images?.map((image, imageIndex) => (
                                <Stack key={imageIndex} gap="16" max>
                                    <ImageUploader
                                        imageUrl={image.src}
                                        onImageChange={(file) => {
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                updateImage(dayIndex, imageIndex, 'src', imageUrl);
                                            }
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={image.alt}
                                        onChange={(e) => updateImage(dayIndex, imageIndex, 'alt', e.target.value)}
                                        placeholder="Описание изображения"
                                        className={styles.imageInput}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(dayIndex, imageIndex)}
                                        className={styles.deleteButton}
                                    >
                                        ✕
                                    </button>
                                </Stack>
                            ))}
                            <Button
                                type="button"
                                color='transparent'
                                onClick={() => addImage(dayIndex)}
                            >
                                + Добавить фото
                            </Button>
                        </Stack>
                    </Stack>
                </div>
            ))}
            <Button
                type="button"
                color='transparent'
                onClick={addDay}
            >
                + Добавить день
            </Button>
        </Stack >
    );
};
