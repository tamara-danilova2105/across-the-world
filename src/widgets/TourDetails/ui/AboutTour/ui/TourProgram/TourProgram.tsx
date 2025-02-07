import { Accordion } from "@/entities/Accordion";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DayTourProgram } from "./ui/DayProgram/DayTourProgram";
import { DayProgram } from "@/entities/Tours/model/types/types"; //TODO public api

interface TourProgramProps {
    program: DayProgram[];
}

export const TourProgram = (props: TourProgramProps) => {
    const { program } = props;

    return (
        <Stack 
            direction="column" 
            gap='24' max
            tag='section'
            id='tour-program'
        >
            <Text type="h3" size='24' font='geometria500'>
                Программа
            </Text>

            {program.map((accordion: DayProgram, index: number) => (
                <Accordion
                    title={<Text size="18">{accordion.title}</Text>}
                    content={
                        <DayTourProgram 
                            images={accordion.images} 
                            details={accordion.details} 
                        />
                    }
                    isSecond={index === 0}
                    key={index}
                />
            ))}
        </Stack>
    );
};
