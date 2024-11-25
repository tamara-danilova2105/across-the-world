import { Stack } from "@/shared/ui/Stack";
import { Dropdown } from "./ui/Dropdown";
import { DateTours } from "@/widgets/OurTours/lib/data";
import { useState } from "react";
import styles from './BookingForm.module.scss';

interface BookingFormProps {
    options: DateTours[];
    tour: string
};

export interface BookingData {
    tour: string;
    selectedDate: string;
    persones: number;
}

export const BookingForm = (props: BookingFormProps) => {
    const { options, tour } = props;

    const [bookingData, setBookingData] = useState<BookingData>({
        tour,
        selectedDate: '',
        persones: 1,
    });

    console.log(bookingData);

    const changeBookingData = (name: string, value: string | number) => {
        setBookingData(prev => ({...prev, [name]: value}));
    };

    return (
        <Stack className={styles.booking_form}>
            <Dropdown 
                changeBookingData={changeBookingData} 
                options={options} 
            />
        </Stack>
    );
};
