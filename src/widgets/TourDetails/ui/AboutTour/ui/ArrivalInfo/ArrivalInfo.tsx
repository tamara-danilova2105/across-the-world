import { PlaneIcon } from "@/shared/assets/svg/planeIcon";
import { LocationInfo } from "./ui/LocationInfo";
import { Text } from "@/shared/ui/Text";
import styles from './ArrivalInfo.module.scss';
import { Stack } from "@/shared/ui/Stack";

export const ArrivalInfo = () => {
    return (
        <div className={styles.travel_card}>
            <Text type="h3" size='24' font='geometria500'>
                Информация по прибытию
            </Text>

            <Stack direction='column' gap='16'>
                <Stack 
                    align='center' 
                    justify='between' 
                    gap='16' max
                    className={styles.locations_container}
                >
                    <LocationInfo
                        type="start"
                        date="21 января"
                        location="Буэнос-Айрос, Аргентина" //TODO
                    />

                    <div className={styles.plane_icon}>
                        <PlaneIcon />
                    </div>

                    <LocationInfo
                        type="finish"
                        date="29 января"
                        location="Сантьяго, Чили" //TODO
                    />
                </Stack>
            </Stack>
        </div>
    );
};
