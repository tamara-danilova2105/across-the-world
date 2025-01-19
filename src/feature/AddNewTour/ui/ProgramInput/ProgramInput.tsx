import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DayProgram } from "@/widgets/OurTours/lib/data";

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
        <Stack direction='column' gap='16'>
            <Text size='18' font='geometria500'>
                Программа тура
            </Text>

            
        </Stack>
    )
}