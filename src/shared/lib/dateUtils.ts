import { Tour } from "@/entities/Tours";

export const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

export function getMonthFromDate(date: string): string {
    return monthNames[new Date(date).getMonth()];
}

export function getYearFromDate(date: string): string {
    return new Date(date).getFullYear().toString();
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
}

export function groupToursByMonth(tours?: Tour[]) {
    if (!Array.isArray(tours)) {
        return {}
    }
    const toursByMonth: Record<string, { date: string; _id: string; tour: string; spots: number, regions: string[], year: string }[]> = {};

    tours.forEach(tour => {
        tour.dates.forEach(dateObj => {
            const month = getMonthFromDate(dateObj.date_start);
            const year = getYearFromDate(dateObj.date_start);
            const filteredTour = {
                date: `${formatDate(dateObj.date_start)} - ${formatDate(dateObj.date_finish)}`,
                _id: tour._id,
                tour: tour.tour,
                spots: Number(dateObj.spots),
                regions: tour.regions,
                year
            }

            if (!toursByMonth[month]) {
                toursByMonth[month] = [];
            }

            toursByMonth[month].push(filteredTour);
        })
    })

    return toursByMonth;
}
