import { Images } from "@/entities/Images";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Tour } from "@/widgets/OurTours/lib/data";
import styles from './TourCard.module.scss';
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteTours } from "@/app/router/lib/helper";
import { NavigateIcon } from "@/shared/assets/svg/heroIcons";

interface TourCardProps {
    tourData: Tour;
};

export const TourCard = ({ tourData }: TourCardProps) => {
    const { tour, date, price, image, discount } = tourData;

    return (
        <div className={styles.tour_card}>
            <Stack className={styles.card_content}>
                <Stack direction="column" gap="16" >
                    <Images src={image} alt={tour} width={290} height={380} />
                    <Text size='18' color='blue' font='geometria500'>
                        {tour}
                    </Text>
                    <Text size="18">{date}</Text>
                    <Text size="18">{price}</Text>
                </Stack>
            </Stack>

            <AppLink 
                variant='button' 
                circle 
                className={styles.link}
                to={getRouteTours()} //TODO - страница тура
            >
                <NavigateIcon />
            </AppLink>

            {discount && (
                <div className={styles.badge}>
                    cкидка {discount.percentage}%
                </div>
            )}
        </div>
    );
};
