import { useState } from "react";
import { ActivityLevel, ComfortType } from "@/widgets/OurTours/lib/data"; //TODO - public api
import { activityData, comfortData } from "@/widgets/TourDetails/lib/activity";
import { Stack } from "@/shared/ui/Stack";
import { ActivityIcon, ComfortIcon } from "@/shared/assets/svg/tourDetailsIcons";
import { InfoCard } from "../InfoCard/InfoCard";
import styles from './Description.module.scss';

interface DescriptionProps {
    activity: ActivityLevel;
    comfort: ComfortType;
    description: string;
};

const MAX_LENGTH = 400;

export const Description = (props: DescriptionProps) => {
    const { activity, comfort, description } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    const shortText = description.length > MAX_LENGTH
        ? `${description.slice(0, MAX_LENGTH)}...`
        : description;

    const activityText = activityData.find(act => act.activity === activity);
    const comfortText = comfortData.find(com => com.comfort === comfort);

    return (
        <Stack 
            tag='section'
            direction='column' 
            gap='48' max
        >
            <Stack 
                gap="32" max 
                className={styles.short_description}
            >
                <InfoCard 
                    category='Активность'
                    categoryType={activity}
                    description={activityText?.description ?? ''}
                    textLink="Смотреть маршрут"
                    hrefLink="/"  //TODO
                >
                    <ActivityIcon />
                </InfoCard>

                <InfoCard 
                    category='Комфорт'
                    categoryType={comfort}
                    description={comfortText?.descriptoin ?? ''}
                    textLink="Где будем жить"
                    hrefLink="/"  //TODO
                >
                    <ComfortIcon />
                </InfoCard>
            </Stack>

            <Stack 
                direction='column' 
                gap="24" max
                className={styles.description_container}
            >
                <hr />
                <div
                    dangerouslySetInnerHTML={{
                    __html: isExpanded ? description : shortText,
                    }}
                    className={styles.description}
                />

                <button onClick={toggleExpanded}>
                    {isExpanded ? 'Свернуть' : 'Показать все'}
                </button>
            </Stack>
        </Stack>
    );
};