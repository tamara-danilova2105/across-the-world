import { TitleSection } from "@/entities/TitleSection";
import { DataFAQ } from "@/entities/FAQ";
import { Accordion } from "@/shared/ui/Accordion";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { useGetFAQsQuery } from "@/feature/FAQEditor";
import { Skeleton } from "@/shared/ui/Skeleton";
import styles from './FAQ.module.scss';

export const FAQ = () => {
    const { data: faqs = [], isLoading, error } = useGetFAQsQuery({});

    if (error) return //не показывать блок в случае ошибки на сервере

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
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} width="100%" height="70px" />
                    ))
                ) : (
                    faqs.map((accordion: DataFAQ, index: number) => (
                        <Accordion
                            title={(
                                <Text size="24" font="geometria500">
                                    {accordion.question}
                                </Text>
                            )}
                            content={(
                                <Text size="18">{accordion.answer}</Text>
                            )}
                            isSecond={index === 1}
                            key={index}
                        />
                    ))
                )}
            </Stack>
        </Stack>
    );
};
