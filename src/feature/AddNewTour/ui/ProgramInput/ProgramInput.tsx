import { DayProgram } from "@/widgets/OurTours/lib/data";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { RichEditor } from "../RichEditor/RichEditor";
import styles from './ProgramInput.module.scss';
import { ImageUploader } from "../ImageUploader/ImageUploader";
import { Images } from "@/shared/types/types";

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

    const handleImagesChange = (dayIndex: number, newImages: Images[]) => {
        const newProgram = [...program];
        newProgram[dayIndex] = {
            ...newProgram[dayIndex],
            images: newImages.map(img => ({
                _id: img._id,
                src: img.src,
                file: img.file,
                alt: img.alt || '',
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
                            <label className={styles.label}>Фотографии</label>
                            <ImageUploader
                                images={day.images?.map(img => ({
                                    _id: img._id,
                                    src: img.src,
                                    file: img.file,
                                    alt: img.alt
                                })) || []}
                                onChange={(images) => handleImagesChange(dayIndex, images)}
                                maxImages={3}
                            />
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
