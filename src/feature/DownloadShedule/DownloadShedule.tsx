import { saveAs } from 'file-saver';
import { Button } from "@/shared/ui/Button"
import { ArrowDownFromLine } from "lucide-react"
import { useGetAllToursQuery } from '@/entities/Tours';
import { groupToursByMonth, monthNames } from '@/shared/lib/dateUtils';
import styles from './DownloadShedule.module.scss'

export const DownloadShedule = () => {

    const { data: toursData = [], isLoading } = useGetAllToursQuery({})//todo error

    const groupedTours = groupToursByMonth(toursData?.tours || {})

    const sortedMonths = Object.keys(groupedTours)
        .sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b))

        const downloadSchedule = () => {
            if (!toursData?.tours?.length) {
                alert("Нет доступных туров для скачивания.");
                return;
            }

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
        };
        

    return(
        <Button className={styles.button} loading={isLoading}
            onClick={downloadSchedule}>
            <ArrowDownFromLine /> Скачать расписание
        </Button>
    )
}