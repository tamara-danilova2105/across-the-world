import { TextEditor } from "@/entities/TextEditor";
import { ImageUploader } from "@/entities/ImageUploader";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { Image } from "@/shared/types/types";
import styles from './ProgramInput.module.scss';
import { DayProgram } from "@/entities/Tours/model/types/types"; //TODO public api

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
        onChange(newProgram);
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
                            <label className={styles.label}>Название дня</label>
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
                            <label className={styles.label}>Описание дня</label>
                            <TextEditor
                                initialContent={day.details}
                                onChange={(value) => updateDay(dayIndex, 'details', value)}
                            />
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
    );
};
