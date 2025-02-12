import { DataFAQ } from "@/entities/FAQ";
import { Accordion } from "@/shared/ui/Accordion";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

interface FAQSectionProps {
    faqs: DataFAQ[]
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
    return (
        <Stack
            direction="column"
            gap='24' max
        >
            <Text type="h3" size='24' font='geometria500'>
                Важно знать
            </Text>

            <Stack
                direction="column"
                gap='24' max
            >
                {faqs.map((accordion: DataFAQ, index: number) => (
                    <Accordion
                        title={<Text size="18">{accordion.question}</Text>}
                        content={<Text size="18">{accordion.answer}</Text>}
                        isSecond={index === 0}
                        key={index}
                    />
                ))}
            </Stack>
        </Stack>
    );
};