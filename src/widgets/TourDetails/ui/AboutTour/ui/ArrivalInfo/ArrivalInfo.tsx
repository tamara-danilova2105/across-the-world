import { PlaneIcon } from "@/shared/assets/svg/planeIcon";
import { Text } from "@/shared/ui/Text";
import { Stack } from "@/shared/ui/Stack";
import { LocationInfo } from "./ui/LocationInfo";
import styles from './ArrivalInfo.module.scss';
import { DateTours, Locations } from "@/entities/Tours/model/types/types"; //TODO public api

interface ArrivalInfoProps {
    locations: Locations;
    dates: DateTours;
};

export const ArrivalInfo = (props: ArrivalInfoProps) => {
    const { locations, dates } = props;

    return (
        <Stack
            direction="column" 
            gap='24' max
        >
            <Text type="h3" size='24' font='geometria500'>
                Информация по прибытию
            </Text>

            <Stack 
                direction='column' gap='16'
                className={styles.travel_card}
            >
                <Stack 
                    align='center' 
                    justify='between' 
                    gap='16' max
                    className={styles.locations_container}
                >
                    <LocationInfo
                        type="start"
                        date={dates.date_start}
                        location={locations.place_start}
                        aria-label={`Start location: ${locations.place_start}`}
                    />

                    <div 
                        className={styles.plane_icon}
                        role="img" 
                        aria-label="Icon of a plane"
                    >
                        <PlaneIcon />
                    </div>

                    <LocationInfo
                        type="finish"
                        date={dates.date_finish}
                        location={locations.place_finish}
                        aria-label={`Finish location: ${locations.place_finish}`}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};
