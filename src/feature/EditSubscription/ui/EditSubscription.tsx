import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Download } from "lucide-react";
import { useLazyGetSubscribersQuery, useManageSubscriptionMutation } from "@/widgets/Subscription/api/subscribeApi";
import { useState } from 'react';
import styles from './EditSubscription.module.scss';
import { toast } from 'react-toastify';

interface SubscriberType {
    email: string;
}

export const EditSubscription = () => {
    const [triggerGetSubscribers, { isFetching }] = useLazyGetSubscribersQuery();
    const [subscription, { isLoading: manageLoad }] = useManageSubscriptionMutation();
    const [isAvailability, setIsAvailability] = useState<boolean>(true);

    const downloadExcel = async () => {
        try {
            const result = await triggerGetSubscribers({}).unwrap();
            const allSubscribers = result?.all_subscribers || [];

            if (!allSubscribers.length) {
                toast.error("Список подписчиков пуст.");
                return;
            }

            const subscribersList = allSubscribers.map((subscriber: SubscriberType, index: number) => ({
                "№": index + 1,
                "Email": subscriber.email
            }));

            const ws = XLSX.utils.json_to_sheet(subscribersList);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Подписчики");

            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            saveAs(blob, "subscribers.xlsx");
        } catch (error) {
            console.error("Ошибка при загрузке подписчиков:", error);
            toast.error("Не удалось загрузить список подписчиков.")
        }
    };

    const changeAvailability = async () => {
        try {
            const newAvailability = !isAvailability;
            await subscription({ availability: newAvailability });
            setIsAvailability(newAvailability);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Stack direction="column" gap="24">
            <Text type='h2' color='blue' size='24' font='geometria500'>
                Управление подпиской на новости
            </Text>

            <Stack align="center" max gap="32" className={styles.button_container}>
                <Button
                    color="secondary"
                    loading={manageLoad}
                    disabled={manageLoad}
                    onClick={changeAvailability}
                >
                    {isAvailability ? 'скрыть секцию на главной странице' : 'показать секцию на главной странице'}
                </Button>
                <Button
                    className={styles.button}
                    loading={isFetching}
                    disabled={isFetching}
                    onClick={downloadExcel}
                >
                    <Download /> скачать список подписчиков Excel
                </Button>
            </Stack>
        </Stack>
    );
};
