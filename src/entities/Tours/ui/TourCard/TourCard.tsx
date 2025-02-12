import { Calendar, Tag } from "lucide-react";
import { Price, Tour } from "../../model/types/types";
import { formatDateRange } from "@/shared/lib/formatDateRange";
import { getRouteToursDetails } from "@/app/router/lib/helper";
import { AppLink } from "@/shared/ui/AppLink";
import styles from "./TourCard.module.scss";
import { Stack } from "@/shared/ui/Stack";

interface TourCardProps {
    tourData: Tour;
}

const NOW_DATE = new Date();

export function TourCard({ tourData }: TourCardProps) {
    const { tour, dates, imageCover, discount, regions, _id } = tourData;

    const sortedDates = [...dates].sort(
        (a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );

    const nearestDate = sortedDates[0];

    const formatPrice = (price: Price) => {
        return `${price.currency} ${Number(price.amount).toLocaleString()}`;
    };

    const discountedPrice = (amount: number, discount: number) => {
        return discount ? amount - (amount * discount) / 100 : amount
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={imageCover[0]?.src} alt={tour} className={styles.image} />
                {(discount && discount.endDate > NOW_DATE) && (
                    <div className={styles.discountBadge}>-{discount.percentage}%</div>
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{tour}</h3>

                <Stack align='center' gap="8" className={styles.priceRow}>
                    <Tag className={styles.icon} />
                    {(discount && discount.endDate > NOW_DATE) ? (
                        <Stack align='center' gap="8">
                            <span className={styles.discountedPrice}>
                                {discountedPrice(Number(dates[0].price.amount), discount.percentage).toLocaleString("ru-RU")}
                            </span>
                            <span className={styles.originalPrice}>{formatPrice(nearestDate.price)}</span>
                        </Stack>
                    ) : (
                        <span className={styles.price}>{formatPrice(nearestDate.price)}</span>
                    )}
                </Stack>

                <Stack align='center' gap="8">
                    <Calendar className={styles.icon} />
                    <span className={styles.dateText}>
                        {formatDateRange(dates[0].date_start, dates[0].date_finish)}
                    </span>
                </Stack>


                <AppLink
                    className={styles.link}
                    to={getRouteToursDetails(regions[0], _id)}
                    aria-label={`Подробнее о туре "${tour}"`}
                >
                    Подробнее
                </AppLink>
            </div>
        </div>
    );
}
