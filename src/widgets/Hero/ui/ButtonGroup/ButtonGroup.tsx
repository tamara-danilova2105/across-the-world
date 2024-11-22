import { getRouteTours } from "@/app/router/lib/helper";
import { Stack } from "@/shared/ui/Stack";
import { AppLink } from "@/shared/ui/AppLink";
import { heroData } from "../../lib/data";
import { Button } from "@/shared/ui/Button";
import { useModal } from "@/shared/hooks/useModal";
import styles from './ButtonGroup.module.scss';
import { BookingTour } from "@/feature/BookingTour";

export const ButtonGroup = () => {
    const { buttonText, linkText } = heroData;

    const [changeModal, drawModal] = useModal();

    return (
        <>
            {drawModal(
                <BookingTour changeModal={changeModal} />
            )}

            <Stack
                justify='between' 
                gap="48" max 
                align='end'
                className={styles.button_container}
            >
                <Button 
                    cta
                    onClick={changeModal}
                >
                    {buttonText}
                </Button>
                <AppLink to={getRouteTours()}>
                    {linkText}
                </AppLink>
            </Stack>
        </>

    );
};