import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { Download } from "lucide-react"
import { groupToursByMonth, monthNames } from '@/shared/lib/dateUtils';
import { useLazyGetAllToursQuery } from '@/entities/Tours/api/api';
import { Button } from "@/shared/ui/Button"
import styles from './DownloadShedule.module.scss'

export const DownloadShedule = () => {

    const [triggerGetShedule, { isFetching }] = useLazyGetAllToursQuery();

    const downloadSchedule = async () => {
        try {
            const result = await triggerGetShedule({}).unwrap();
            const toursData = result?.tours || [];

            if (!toursData.length) {
                toast.error("Нет доступных туров для скачивания.");
                return;
            }

            const groupedTours = groupToursByMonth(toursData);

            const sortedMonths = Object.keys(groupedTours)
                .sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b));

            const calendarEmoji = String.fromCodePoint(0x1F4C5);
            let textContent = sortedMonths.map((month) => {
                let monthHeader = `${month} ${groupedTours[month][0]?.year}\n\n`;
                let toursList = groupedTours[month].map(({ date, tour, spots, regions }) =>
                    `${calendarEmoji} ${date} ${tour} - ${regions.join(", ")} | Места: ${spots}`
                ).join("\n");

                return `${monthHeader}${toursList}\n`;
            }).join("\n");

            const blob = new Blob([textContent], { type: "text/plain;charset=utf-8;" });
            saveAs(blob, "schedule.txt");
        } catch (error) {
            console.error("Ошибка при скачивании расписания:", error);
            toast.error("Не удалось получить данные для скачивания.")
        }
    };


    return (
        <Button
            className={styles.button}
            loading={isFetching}
            disabled={isFetching}
            onClick={downloadSchedule}
        >
            <Download />  Скачать расписание
        </Button>
    )
}