import { getRouteToursDetails } from "@/app/router/lib/helper";
import { Tour } from "@/widgets/OurTours/lib/data";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { formatDateRange } from "@/shared/lib/formatDateRange";
import styles from './TourCard.module.scss';
import { declOfNum } from "@/shared/lib/declOfNum";

const NOW_DATE = new Date();

interface TourCardProps {
    tourData: Tour;
};

export const TourCard = ({ tourData }: TourCardProps) => {
    const {
        tour,
        dates,
        imageCover,
        discount,
        regions,
        _id
    } = tourData;

    const discountedPrice = (amount: number, discount: number) => {
        return discount ? amount - (amount * discount) / 100 : amount
    };

    return (
        <article className={styles.tour_card}>
            <Stack
                direction="column"
                justify='between'
                gap="16"
            >
                <Stack className={styles.imageContainer}>
                    <img src={imageCover[0]?.src} alt={tour} draggable={false} />
                </Stack>

                <Stack
                    gap="16"
                    direction='column'
                    className={styles.text_container}
                >
                    <Text size='18' color='blue' font='geometria500'>
                        {tour}
                    </Text>
                    <Stack justify='between' max>
                        <Text size="16">
                            {formatDateRange(dates[0].date_start, dates[0].date_finish)}
                        </Text>
                        {dates.length > 1 &&
                            <span>+{dates.length - 1} {declOfNum(dates.length, ['дата', 'даты', 'дат'])}</span>
                        }
                    </Stack>
                    {(discount && discount.endDate > NOW_DATE) ? (
                        <Stack gap="16" align='center'>
                            <Text size="18" className={styles.old_price}>
                                {dates[0].price.amount.toLocaleString("ru-RU")}
                                {dates[0].price.currency}
                            </Text>

                            <Text size="18" font='geometria500' className={styles.new_price}>
                                {discountedPrice(dates[0].price.amount, discount.percentage).toLocaleString("ru-RU")}
                                {dates[0].price.currency}
                            </Text>
                        </Stack>
                    ) : (
                        <Text size="18" color="blue" font='geometria500'>
                            {dates[0].price.amount.toLocaleString("ru-RU")}
                            {dates[0].price.currency}
                        </Text>
                    )}

                    <AppLink
                        className={styles.link}
                        to={getRouteToursDetails(regions[0], _id)}
                        aria-label={`Подробнее о туре "${tour}"`}
                    >
                        Подробнее
                    </AppLink>
                </Stack>
            </Stack>
            {(discount && discount.endDate > NOW_DATE) && (
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
