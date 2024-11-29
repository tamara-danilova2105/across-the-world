import { Stack } from "@/shared/ui/Stack";
import styles from './Description.module.scss';
import { Text } from "@/shared/ui/Text";
import { ActivityLevel, ComfortType } from "@/widgets/OurTours/lib/data"; //TODO - public api
import { AppLink } from "@/shared/ui/AppLink";
import { useState } from "react";

interface DescriptionProps {
    activity: ActivityLevel;
    comfort: ComfortType;
    description: string;
};

const MAX_LENGTH = 400;

export const Description = (props: DescriptionProps) => {
    const { activity, comfort, description } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev);
      };    

    const shortText = description.length > MAX_LENGTH
      ? `${description.slice(0, MAX_LENGTH)}...`
      : description;

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
                <Stack direction='column' gap="16">
                    <Stack direction='column' gap="4">
                        <Text>Активность</Text>
                        <Stack gap="8">
                            <Text font='geometria500'>{activity}</Text>
                            !!!!
                        </Stack>
                    </Stack>
                    <div>
                        <AppLink 
                            to='/' //TODO
                            variant='link'
                            size="14"
                        >
                            Смотреть маршрут
                        </AppLink>
                    </div>
                </Stack>

                <Stack direction='column' gap="16">
                    <Stack direction='column' gap="4">
                        <Text>Комфорт</Text>
                        <Stack gap="8">
                            <Text font='geometria500'>{comfort}</Text>
                            !!!!
                        </Stack>
                    </Stack>
                    <div>
                        <AppLink 
                            to='/' //TODO
                            variant='link'
                            size="14"
                        >
                            Где будем жить
                        </AppLink>
                    </div>
                </Stack>
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