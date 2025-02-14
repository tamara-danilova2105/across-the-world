import { Calendar, Tag } from "lucide-react";
import { Price, Tour } from "../../model/types/types";
import { formatDateRange } from "@/shared/lib/formatDateRange";
import { getRouteToursDetails } from "@/app/router/lib/helper";
import { AppLink } from "@/shared/ui/AppLink";
import styles from "./TourCard.module.scss";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { apiUrl } from "@/shared/api/endpoints";

interface TourCardProps {
    tourData: Tour;
}

const NOW_DATE = new Date();

const formatPrice = (price: Price) => {
    return `${price.currency} ${Number(price.amount).toLocaleString("ru-RU")}`;
};

export function TourCard({ tourData }: TourCardProps) {
    const { tour, dates, imageCover, discount, regions, _id } = tourData;

    const sortedDates = [...dates].sort(
        (a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );

    const nearestDate = sortedDates[0];
    const isDiscountActive = discount && new Date(discount.endDate) > NOW_DATE;

    const getDiscountedPrice = (price: Price, discount?: number) => {
        if (!discount) return formatPrice(price);
        const newPrice = Number(price.amount) - (Number(price.amount) * (discount / 100));
        return `${price.currency} ${newPrice.toLocaleString("ru-RU")}`;
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={`${apiUrl}${imageCover[0]?.src}`} alt={tour}
                    className={styles.image}
                />
                {isDiscountActive && (
                    <div className={styles.discountBadge}>-{discount.percentage}%</div>
                )}
            </div>

            <div className={styles.content}>
                <Text
                    type="h3" size="16"
                    font="unbounded" color="blue"
                    className={styles.title}
                >
                    {tour}
                </Text>

                <Stack align="center" gap="8" className={styles.priceRow}>
                    <Tag className={styles.icon} />
                    {isDiscountActive ? (
                        <Stack align="center" gap="8">
                            <span
                                className={styles.discountedPrice}
                                aria-label={`Цена со скидкой: ${getDiscountedPrice(nearestDate.price, discount.percentage)}`}
                            >
                                {getDiscountedPrice(nearestDate.price, discount.percentage)}
                            </span>
                            <span className={styles.originalPrice}>{formatPrice(nearestDate.price)}</span>
                        </Stack>
                    ) : (
                        <span
                            className={styles.price}
                            aria-label={`Стоимость тура: ${formatPrice(nearestDate.price)}`}
                        >
                            {formatPrice(nearestDate.price)}
                        </span>
                    )}
                </Stack>

                <Stack align="center" gap="8">
                    <Calendar className={styles.icon} />
                    <span className={styles.dateText}>
                        {formatDateRange(nearestDate.date_start, nearestDate.date_finish)}
                    </span>
                </Stack>

                <AppLink
                    className={styles.link}
                    to={getRouteToursDetails(regions[0], _id)}
                    role="button"
                    aria-describedby={`tour-title-${_id}`}
                >
                    <span aria-hidden="true">Подробнее</span>
                </AppLink>
            </div>
        </div>
    );
}

