import { Accordion } from "@/entities/Accordion";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DataFAQ } from "@/widgets/FAQ/lib/data";

//TODO
export const faqData: DataFAQ[] = [
    {
        question: "Какие документы необходимы?",
        answer: `
            Для посещения Патагонии вам потребуется заграничный паспорт, действительный не менее 6 месяцев с даты окончания поездки. 
            Для граждан некоторых стран может потребоваться виза в Аргентину или Чили. Для граждан России визы не требуются.
            Рекомендуеем оформить медицинскую страховку на весь период путешествия
        `
    },
    {
        question: "Условия отмены",
        answer: `
            Вы можете отменить бронирование за 30 дней до начала тура с возвратом полной стоимости, за вычетом административных расходов. 
            В случае отмены менее чем за 30 дней до поездки, возврат средств не производится. Рекомендуется оформить страховку на случай отмены поездки.
        `,
    },
    {
        question: "Нужно ли оплачивать тур полностью?",
        answer: `
            Для бронирования места достаточно внести предоплату в размере 30% от стоимости тура. 
            Полная оплата должна быть произведена не позднее 14 дней до начала тура.
        `,
    },
];

export const FAQSection = () => {
    return (
        <Stack
            direction="column" 
            gap='24' max
        >
            <Text size='24' font='geometria500'>
                Важно знать
            </Text>
            
            <Stack 
                direction="column" 
                gap='24' max
            >
                {faqData.map((accordion: DataFAQ, index: number) => (
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