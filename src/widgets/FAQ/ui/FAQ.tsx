import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import styles from './FAQ.module.scss';
import { DataFAQ, faqData } from "../lib/data";
import { Accordion } from "@/entities/Accordion";

export const FAQ = () => {

    console.log(faqData)
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
                gap='16' 
                max
            >
                {faqData.map((accordion: DataFAQ, index: number) => (
                    <Accordion accordion={accordion}
                    isSecond={index === 1}
                    key={index}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
