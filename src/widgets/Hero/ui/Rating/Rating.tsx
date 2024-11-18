import { AddIcon, RatingIcon } from "@/shared/assets/svg/heroIcons";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { heroData } from "../../lib/data";
import styles from './Rating.module.scss';

export const Rating = () => {
    const { ratingText, trustText } = heroData;

    return (
        <Stack 
            gap='64' 
            align='center' 
            tag='aside'
            className={styles.rating_main}
        >
            <Stack className={styles.rating_container}>
                <RatingIcon />
                <Button 
                    className={styles.rating_btn} 
                    circle
                    color='secondary'
                >
                    <AddIcon />
                </Button>
            </Stack>
            <Stack 
                direction='column' 
                justify='between'
                className={styles.rating_text}
            >
                <Text type='h3' size='24' font='geometria500'>
                    {ratingText}
                </Text>
                <Text size='16'>
                    {trustText}
                </Text>
            </Stack>
        </Stack>
    );
};
