import { getRouteToursDetails } from "@/app/router/lib/helper";
import { Tour } from "@/widgets/OurTours/lib/data";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import styles from './TourCard.module.scss';
import { useMemo } from "react";

interface TourCardProps {
    tourData: Tour;
};

export const TourCard = ({ tourData }: TourCardProps) => {
    const { 
        tour, 
        date, 
        price: { amount, currency },
        image, 
        discount, 
        region,
        _id 
    } = tourData;

    const discountedPrice = useMemo(() => 
        discount 
            ? amount - (amount * discount.percentage) / 100 
            : amount,
        [amount, discount]
    );


    return (
        <article className={styles.tour_card}>
            <Stack 
                direction="column" 
                justify='between'
                gap="16"
            >
                <Stack className={styles.imageContainer}>
                    <img src={image} alt={tour} draggable={false} />
                </Stack>
                
                <Stack 
                    gap="16" 
                    direction='column' 
                    className={styles.text_container}
                >
                    <Text size='18' color='blue' font='geometria500'>
                        {tour}
                    </Text>
                    <Text size="18">{date}</Text>

                    {discount ? (
                        <Stack gap="16" align='center'>
                            <Text size="18" className={styles.old_price}>
                                {amount.toLocaleString("ru-RU")} {currency}
                            </Text>

                            <Text size="18" font='geometria500' className={styles.new_price}>
                                {discountedPrice.toLocaleString("ru-RU")} {currency}
                            </Text>
                        </Stack>
                    ) : (
                        <Text size="18" color="blue" font='geometria500'>
                            {amount.toLocaleString("ru-RU")} {currency}
                        </Text>
                    )}

                    <AppLink 
                        className={styles.link} 
                        to={getRouteToursDetails(region, _id)}
                        aria-label={`Подробнее о туре "${tour}"`}
                    >
                        Подробнее
                    </AppLink>
                </Stack>
            </Stack>
            {discount && (
                <div 
                    className={styles.badge}
                    aria-label={`Скидка ${discount.percentage}%`}
                >
                    скидка {discount.percentage}%
                </div>
            )}
        </article>
    );
};
