import { Tour } from "@/entities/Tours";

export const defaultTourValues: Omit<Tour, '_id'> = {
    types: [],
    tour: '',
    dates: [
        {
            date_start: '',
            date_finish: '',
            price: { amount: '', currency: '$' },
            spotsTotal: '',
        },
    ],
    locations: {
        place_start: '',
        place_finish: '',
    },
    details: {
        included: '',
        notIncluded: '',
    },
    imageCover: [],
    direction: 'Заграница',
    regions: [],
    activity: 'Для всех',
    comfort: 'Высокий',
    description: '',
    program: [],
    hotels: [],
    isPublished: true,
    mustKnow: [],
};
