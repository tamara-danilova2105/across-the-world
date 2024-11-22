import { Stack } from "@/shared/ui/Stack";
import styles from './BookingTour.module.scss';

interface BookingTourProps {
    changeModal: () => void;
}

export const BookingTour = (props: BookingTourProps) => {
    const { changeModal } = props;
    console.log(changeModal);
    
    return (
        <Stack className={styles.booking_modal}>
            Booking Tour
        </Stack>
    )
}