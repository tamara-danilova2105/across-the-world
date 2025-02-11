import { useCallback, useMemo, useState } from "react";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { declOfNum } from "@/shared/lib/declOfNum";
import { Button } from "@/shared/ui/Button";
import { useModal } from "@/shared/hooks/useModal";
import { ParticipantCounter } from "./ui/ParticipantCounter/ParticipantCounter";
import { Dropdown } from "./ui/Dropdown/Dropdown";
import { ContactForm } from "./ui/ContactForm/ContactForm";
import styles from './BookingForm.module.scss';
import { DateTours } from "@/entities/Tours";

interface BookingFormProps {
    options: DateTours[];
    tour: string;
};

export interface BookingData {
    tour: string;
    persones: number;
    id?: string;
};

export const BookingForm = (props: BookingFormProps) => {
    const { options, tour } = props;

    const [isOpen, setIsOpen] = useState(false);
    
    const [bookingData, setBookingData] = useState<BookingData>({
        tour,
        persones: 1,
    });

    const [changeModal, drawModal] = useModal();

    const selectedTour = options.find(option => option._id === bookingData.id);

    const changeBookingData = (name: string, value: string | number) => {
        setBookingData(prev => ({...prev, [name]: value}));
    };

    const handleIsOpen = useCallback(() => setIsOpen(prev => !prev), []);

    const handleClick = () => {
        if (!bookingData.id) setIsOpen(true)
        else changeModal();
    };

    const minPriceData = useMemo(() => {
        if (options.length === 0) {
            return null;
        }
        const minOption = options.reduce((min, current) => 
            current.price.amount < min.price.amount ? current : min
        );

        return { 
            amount: minOption.price.amount, 
            currency: minOption.price.currency 
        };
    }, [options]);

    const calculateDays = (dateStart: string, dateFinish: string): number => {
        const start = new Date(dateStart);
        const finish = new Date(dateFinish);
        const differenceInTime = finish.getTime() - start.getTime();
        return Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
    };
    
    const days = calculateDays(options[0].date_start, options[0].date_finish);

    return (
        <>
            {drawModal(
                <ContactForm 
                    bookingData={bookingData} 
                    changeModal={changeModal}
                />
            )}

            <Stack 
                direction="column" 
                gap="32"
                justify='between'
                className={styles.booking_form}
            >
                <Stack direction='column' gap="16">
                    <Text type='h3' size='18' font='unbounded' color='blue'>
                        {tour}
                    </Text>
                    <Text size='16' font='unbounded'>
                        от {minPriceData?.amount} {minPriceData?.currency} {" "} 
                        / {days} {declOfNum(days, ['день', 'дня', 'дней'])}
                    </Text>
                </Stack>

                <Stack max direction='column' gap="8" align='center'>
                    <div className={styles.form}>
                        <Dropdown 
                            changeBookingData={changeBookingData} 
                            options={options} 
                            isOpen={isOpen}
                            handleIsOpen={handleIsOpen}
                        />
                        <ParticipantCounter 
                            max={selectedTour ? selectedTour.spots : 10} 
                            onChange={changeBookingData}
                        />
                    </div>

                    <Text 
                        color='blue' 
                        size='16' 
                        font='geometria500'
                        className={styles.count_info}
                    >
                        {selectedTour && 
                            `осталось ${selectedTour.spots} ${declOfNum(selectedTour.spots, ['место', 'места', 'мест'])}`
                        }
                    </Text>
                </Stack>

                <Button onClick={handleClick}>
                    {selectedTour ? 'Забронировать' : 'Выбрать даты'}
                </Button>
            </Stack>
        </>
    );
};
