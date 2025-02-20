import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@/shared/ui/Button"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { ArrowDownFromLine } from "lucide-react"
import { useGetSubscribersQuery, useManageSubscriptionMutation } from "@/widgets/Subscription/api/subscribeApi"
import styles from './EditSubscription.module.scss'
import { useState } from 'react';

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

    const [subscription, {isLoading: manage_load}] = useManageSubscriptionMutation();
    const [isAvailability, setIsAvailability] = useState<boolean>(availability)

    const changeAvailability = async () => {
        try {
            const new_availability = !isAvailability;
            await subscription({availability: new_availability})
            setIsAvailability(new_availability)
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <Stack direction="column" gap="24"
            className={styles.editSubscription}>
            <Stack>
                <Text type="h2" color="blue" 
                    font="geometria500" size="32"
                >
                    Управление подпиской
                </Text>
            </Stack>
            <Stack align="center" max gap="32"> 
                <Button color="secondary" loading={manage_load}
                    onClick={changeAvailability}>
                    {availability ? 
                    'Остановить подписку ':
                    'Возобновить подписку' }
                </Button>
                <Button className={styles.button} loading={isLoading}
                    onClick={downloadExcel}>
                    <ArrowDownFromLine/> Список подписчиков
                </Button>
            </Stack>
        </Stack>
    )
}