import { Stack } from "@/shared/ui/Stack";
import { Tour } from "@/widgets/OurTours/lib/data"; //TODO public api
import { useState } from "react";

export const TourForm = () => {

    const [formData, setFormData] = useState<Tour>({
        _id: '',
        tour: '',
        dates: [],
        locations: {
            place_start: '',
            place_finish: '',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        image: '',
        direction: 'Россия',
        region: 'Russia',
        counrty: 'Kamchatka',
        activity: 'Для всех',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
    });
    
    return (
        <Stack direction='column' gap="16">
            <form>

            </form>
        </Stack>
    );
};