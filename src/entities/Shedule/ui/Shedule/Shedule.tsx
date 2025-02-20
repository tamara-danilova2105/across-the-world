import { ContactUs } from "@/entities/ContactUs/index"
import { LogoFont } from "@/shared/assets/svg/logoFont"
import { LogoMain } from "@/shared/assets/svg/logo_main"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { SheduleItem } from "../SheduleItem/SheduleItem"
import { useGetAllToursQuery } from "@/entities/Tours"
import { groupToursByMonth, monthNames } from "@/shared/lib/dateUtils"
import { Loading } from "@/shared/ui/Loading"
import styles from './Shedule.module.scss'

export const Shedule = () => {
    const { data: dataTours, error, isLoading } = useGetAllToursQuery({})

    console.log(error) //todo

    const groupedTours = groupToursByMonth(dataTours?.tours || {})

    const sortedMonths = Object.keys(groupedTours)
        .sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b))

    return (
        <Stack direction='column' gap='16' 
            className={styles.shedule_container}
        >
            <Stack align='center' justify='between' 
                className={styles.contact_container} max
            >
                <LogoMain />
                <ContactUs />
            </Stack>
            <Stack align='center' justify='center' 
                direction='column' gap='8' 
                max className={styles.heading}
            >
                <Text type='h3' size='24' 
                    font='geometria600' color='blue'
                >
                    Расписание туров
                </Text>
                <Text size='18' color='blue'>
                    Свяжитесь с менеджером для уточнения деталей тура!
                </Text>
            </Stack>
            <Stack direction='column' gap='32' 
                className={styles.shedule_item}
            >
                {isLoading ? (
                    <Loading width="50" height="50"/>
                ) : (
                sortedMonths.map((month, index) => (
                    <Stack key={index} direction='column' 
                        gap='16' max
                    >
                        <Stack gap='16' className={styles.month}>
                            <Text size='18' color='blue' 
                                font='geometria600'
                            >
                                {month}
                            </Text>
                            <Text size='18' color='blue' 
                                font='geometria600'
                            >
                                {groupedTours[month][0]?.year}
                            </Text>
                        </Stack>
                        {groupedTours[month].map((tour, index) => (
                            <SheduleItem
                                key={`${tour._id}-${index}`}
                                _id={tour._id}
                                date={tour.date}
                                tour={tour.tour}
                                spots={tour.spots}
                                regions={tour.regions}
                            />
                        ))}
                    </Stack>
                )))}
                <Stack justify='center' align='center'
                    max className={styles.logoFont_svg}
                >
                    <LogoFont />
                </Stack>
            </Stack>
        </Stack>
    )
}
