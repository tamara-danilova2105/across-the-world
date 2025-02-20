import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@/shared/ui/Button"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Download } from "lucide-react"
import { useGetSubscribersQuery, useManageSubscriptionMutation } from "@/widgets/Subscription/api/subscribeApi"
import { useState } from 'react';
import styles from './EditSubscription.module.scss'

interface SubscriberType {
    email: string;
}

export const EditSubscription = () => {
    const { data, isLoading } = useGetSubscribersQuery({});

    const all_subscribers = data?.all_subscribers || [];
    const availability = data?.availability ?? true;

    const downloadExcel = () => {
        const subscribers_list = all_subscribers
            .map((subscriber: SubscriberType, index: number) => ({
                "№": index + 1,
                "Email": subscriber.email
            }));

        const ws = XLSX.utils.json_to_sheet(subscribers_list);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Подписчики");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        saveAs(blob, "subscribers.xlsx");
    }

    const [subscription, { isLoading: manage_load }] = useManageSubscriptionMutation();
    const [isAvailability, setIsAvailability] = useState<boolean>(availability)

    const changeAvailability = async () => {
        try {
            const new_availability = !isAvailability;
            await subscription({ availability: new_availability })
            setIsAvailability(new_availability)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Stack direction="column" gap="24">
            <Text type='h2' color='blue' size='24' font='geometria500'>
                Управление подпиской на новости
            </Text>

            <Stack align="center" max gap="32"
                className={styles.button_container}>
                <Button
                    color="secondary"
                    loading={manage_load}
                    disabled={manage_load}
                    onClick={changeAvailability}
                >
                    {availability ?
                        'Скрыть секцию на главной странице' :
                        'Показать секцию на главной странице'}
                </Button>
                <Button
                    className={styles.button}
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={downloadExcel}
                >
                    <Download /> Скачать список подписчиков Excel
                </Button>
            </Stack>
        </Stack>
    )
}