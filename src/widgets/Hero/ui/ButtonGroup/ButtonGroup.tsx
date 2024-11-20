import { getRouteTours } from "@/app/router/lib/helper";
import { Stack } from "@/shared/ui/Stack";
import { AppLink } from "@/shared/ui/AppLink";
import { heroData } from "../../lib/data";
import styles from './ButtonGroup.module.scss';

export const ButtonGroup = () => {
    const { buttonText, linkText } = heroData;

    return (
        <Stack
            justify='between' 
            gap="48" max 
            align='end'
            className={styles.button_container}
        >
            <AppLink 
                to={getRouteTours()}
                variant="button" 
                cta
            >
                {buttonText}
            </AppLink>
            <AppLink to={getRouteTours()}>
                {linkText}
            </AppLink>
        </Stack>
    );
};