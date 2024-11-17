import { getRouteTours } from "@/app/router/lib/helper";
import { SearchTours } from "@/feature/SearchTours";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { 
    AddIcon, 
    FireWorks, 
    RatingIcon 
} from "@/shared/assets/svg/heroIcons";
import { AppLink } from "@/shared/ui/AppLink";
import { Button } from "@/shared/ui/Button";
import { heroData } from "../../lib/data";
import styles from './Description.module.scss';

export const Description = () => {
    const { description, buttonText, linkText, ratingText, trustText } = heroData;

    return (
        <Stack direction='column' gap="32">
            <div className={styles.preview_container}>
                <SearchTours />
                <span>
                    <FireWorks />
                </span>
            </div>
            <Stack direction='column' gap="16">
                <Text type='h1' className={styles.header} font='unbounded'>
                    <span>Авторские туры</span> <br /> по России и миру
                </Text>
                <Text size="18" className={styles.description_text}>
                    {description}
                </Text>
            </Stack>
            <Stack 
                justify='between' 
                gap="48" max 
                align='end'
                className={styles.button_container}
            >
                <AppLink variant="button" to={getRouteTours()}>
                    {buttonText}
                </AppLink>
                <AppLink to={getRouteTours()}>
                    {linkText}
                </AppLink>
            </Stack>
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
        </Stack>
    );
};
