import { Stack } from "@/shared/ui/Stack"
import { InfoCard } from "./ui/InfoCard/InfoCard"
import { ActivityIcon, ComfortIcon } from "@/shared/assets/svg/tourDetailsIcons"
import styles from './Infornations.module.scss';
import { activityData, comfortData } from "../../../../lib/activity";
import { ActivityLevel, ComfortType } from "@/entities/Tours";

interface InfornationsProps {
    activity: ActivityLevel;
    comfort: ComfortType;
}

export const Infornations = (props: InfornationsProps) => {
    const { activity, comfort } = props;
    
    const activityText = activityData.find(act => act.activity === activity);
    const comfortText = comfortData.find(com => com.comfort === comfort);

    return (
        <Stack 
            gap="32" max 
            className={styles.short_description}
        >
            <InfoCard 
                category='Активность'
                categoryType={activity}
                description={activityText?.description ?? ''}
                textLink="Смотреть маршрут"
                hrefLink="#tour-program"
            >
                <ActivityIcon />
            </InfoCard>

            <InfoCard 
                category='Комфорт'
                categoryType={comfort}
                description={comfortText?.descriptoin ?? ''}
                textLink="Где будем жить"
                hrefLink="#stay-details"
            >
                <ComfortIcon />
            </InfoCard>
        </Stack>
    )
}