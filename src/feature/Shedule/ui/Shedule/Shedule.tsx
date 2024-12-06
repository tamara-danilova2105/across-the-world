import { ContactUs } from "@/entities/ContactUs/index"
import { Logo_main } from "@/shared/assets/svg/logo_main"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { dataTours } from "@/widgets/OurTours/lib/data"
import { SheduleItem } from "../SheduleItem/SheduleItem"
import styles from './Shedule.module.scss'

export const Shedule = () => {

    function getMonthFromDate(date) {
        const monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
        const monthIndex = new Date(date).getMonth();
        return monthNames[monthIndex];
    }

    function groupToursByMonth(tours) {
        const toursByMonth = {};
    
        tours.forEach(tour => {
            tour.dates.forEach(dateObj => {
                const month = getMonthFromDate(dateObj.date_start); 
                const filteredTour = {
                    date: `${formatDate(dateObj.date_start)} - ${formatDate(dateObj.date_finish)}`,
                    _id: tour._id,
                    tour: tour.tour,
                    spots: dateObj.spots 
                }

                if (!toursByMonth[month]) {
                    toursByMonth[month] = [];
                }

                toursByMonth[month].push(filteredTour);
            });
        });
    
        return toursByMonth;
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        return `${day}.${month}`;
    }
    
    const groupedTours = groupToursByMonth(dataTours);
    console.log(groupedTours);

    return(
        <Stack
            direction='column'
            gap='16'
            className={styles.shedule_container}
        >
            <Stack
                align='center'
                justify='between'
                className={styles.contact_container}
                max
            >
                <Logo_main/>
                <ContactUs/>
            </Stack>
            <Stack
                align='center'
                justify='center'
                direction='column'
                gap='8'
                max
                className={styles.heading}
            >
                <Text
                    type='h3'
                    size='24'
                    font='geometria600'
                    color='blue'
                >
                    Расписание туров
                </Text>
                <Text
                    size='18'
                    color='blue'
                >
                    Свяжитесь с менеджером для уточнения деталей тура!
                </Text>
            </Stack>
            {Object.keys(groupedTours).map(month => (
            <Stack 
                key={month}
                direction='column'
                gap='16'
                max
            >
                <Stack 
                    gap='16'
                    className={styles.month}
                >
                    <Text
                        size='24'
                        font='geometria500'
                        color='blue'
                    >
                        {month}
                    </Text>
                    <Text
                        size='24'
                        font='geometria500'
                        color='blue'
                    >
                        2024
                        {/* todo */}
                    </Text>
                </Stack>
                {groupedTours[month].map(tour => (
                <SheduleItem
                    key={tour._id}
                    date={tour.date}
                    tour={tour.tour}
                    spots={tour.spots}
                />
                ))}
            </Stack>
            ))}
        </Stack>
    )
}
