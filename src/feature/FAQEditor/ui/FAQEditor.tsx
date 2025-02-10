import { DataFAQ, FAQForm } from "@/entities/FAQ";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { useEffect, useState } from "react";
import styles from './FAQEditor.module.scss';
import { useGetFAQsQuery, useUpdateFAQsMutation } from "../api/api";
import { toast } from "react-toastify";

export const FAQEditor = () => {
    const [faqs, setFaqs] = useState<DataFAQ[]>([]);

    const { data, isLoading: isLoadingGet, error: isGetError } = useGetFAQsQuery({});
    const [saveFAQs, { isLoading: isLoadingSave }] = useUpdateFAQsMutation({})

    useEffect(() => {
        if (data) {
            setFaqs(data);
        }
    }, [data]);
    

    const handleSaveFAQs = async () => {
        try {
            await saveFAQs({ faqs }).unwrap();
            toast.success('FAQs успешно сохранены');
        } catch (err) {
            toast.error('Произошла ошибка, попробуй снова');
        }
    }

    if (isLoadingGet) return <p>Загрузка...</p> //TODO
    if (isGetError) return <p>Ошибка загрузки данных</p> //TODO

    return (
        <Stack direction='column' gap="16" max>
            <Stack max justify='between' className={styles.header}>
                <Text type='h2' color='blue' size='24' font='geometria500'>
                    Отредактировать FAQ
                </Text>
                <Button
                    onClick={handleSaveFAQs}
                    disabled={isLoadingSave}
                    loading={isLoadingSave}
                >
                    Сохранить
                </Button>
            </Stack>


            <FAQForm
                faqs={faqs}
                onChange={setFaqs}
                allowDeleteFirst
            />
        </Stack>

    );
};