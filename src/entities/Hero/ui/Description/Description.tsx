import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { heroData } from "../../lib/data";
import { AddIcon, FireWorks, RatingIcon } from "@/shared/assets/svg/heroIcons";
import { AppLink } from "@/shared/ui/AppLink";
import { Button } from "@/shared/ui/Button";
import { getRouteTours } from "@/app/router/lib/helper";
import styles from './Description.module.scss';

export const Description = () => {
    const { preview, description, buttonText, linkText, ratingText, trustText } = heroData;

    return (
        <Stack direction='column' gap="32">
            <div className={styles.preview_container}>
                <Text type="h3" size='18'>{preview}</Text>
                <FireWorks />
            </div>
            <Stack direction='column' gap="16">
                <Text type='h1' className={styles.header} font='unbounded'>
                    <span>Авторские туры</span> <br /> по России и миру
                </Text>
                <Text size="18">
                    {description}
                </Text>
            </Stack>
            <Stack justify='between' gap="16" max align='end'>
                <Button>
                    {buttonText}
                </Button>
                <AppLink to={getRouteTours()}>
                    {linkText}
                </AppLink>
            </Stack>
            <Stack gap='64' align='center'>
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
        </Stack>
    );
};
