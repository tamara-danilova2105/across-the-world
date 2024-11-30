import { Accordion } from "@/entities/Accordion";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DayProgram } from "@/widgets/OurTours/lib/data"; //TODO - public api
import { DayTourProgram } from "../DayProgram/DayTourProgram";

interface TourProgramProps {
    program: DayProgram[];
}

export const TourProgram = (props: TourProgramProps) => {
    const { program } = props;

    return (
        <Stack 
            direction="column" 
            gap='24' max
        >
            <Text size='24' font='geometria500'>Программа</Text>

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
