import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataFAQ, FAQForm } from "@/entities/FAQ";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { useGetFAQsQuery, useUpdateFAQsMutation } from "../api/api";
import styles from './FAQEditor.module.scss';

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
    };

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

            {isGetError && (
                <Text color="red" size="18">
                    Произошла ошибка при загрузке
                </Text>
            )}

            <FAQForm
                faqs={faqs}
                onChange={setFaqs}
                allowDeleteFirst
                isLoading={isLoadingGet}
            />
        </Stack>

    );
};