import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import styles from './FAQ.module.scss';
import { DataFAQ, faqData } from "../lib/data";
import { Accordion } from "@/entities/Accordion";
import { Text } from "@/shared/ui/Text";

export const FAQ = () => {
    return (
        <Stack 
            tag='section' 
            direction="column"
            gap="48"
            className={styles.main}
        >
            <TitleSection 
                subtitle="FAQ" 
                title="Есть вопросы? Посмотри здесь" 
            />
            <Stack 
                direction="column" 
                gap='24' max
            >
                {faqData.map((accordion: DataFAQ, index: number) => (
                    <Accordion 
                        title={<Text size="24" font="geometria500">{accordion.question}</Text>}
                        content={<Text size="18">{accordion.answer}</Text>}
                        isSecond={index === 1}
                        key={index}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
