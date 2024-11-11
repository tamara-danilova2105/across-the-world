import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Tour } from "@/widgets/OurTours/lib/data";
import styles from './TourCard.module.scss';
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteToursDetails } from "@/app/router/lib/helper";

interface TourCardProps {
    tourData: Tour;
};

export const TourCard = ({ tourData }: TourCardProps) => {
    const { tour, date, price, image, discount, _id } = tourData;

    return (
        <div className={styles.tour_card}>
            <Stack direction="column" gap="16">
                <img src={image} alt={tour}/>
                <Stack 
                    gap="16" direction='column'
                    className={styles.text_container}
                >
                    <Text size='18' color='blue' font='geometria500'>
                        {tour}
                    </Text>
                    <Text size="18">{date}</Text>
                    <Text size="18">{price.amount.toLocaleString("ru-RU")} {price.currency}</Text>
                </Stack>
            </Stack>

            {discount && (
                <div className={styles.badge}>
                    cкидка {discount.percentage}%
                </div>
            )}
            <div className={styles.link}>
                <AppLink to={getRouteToursDetails(_id)}>
                    Подробнее
                </AppLink>
            </div>
        </div>
    );
};
