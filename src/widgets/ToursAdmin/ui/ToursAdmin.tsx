import { TourCardAdmin, useGetAllToursQuery } from "@/entities/Tours";
import { Stack } from "@/shared/ui/Stack";
import styles from './ToursAdmin.module.scss';
import { Text } from "@/shared/ui/Text";

//TODO моковые данные
const data = {
    dates: [
        {
            _id: '50',
            date_start: '2024-12-29T00:00:00.000Z',
            date_finish: '2025-01-06T23:59:59.000Z',
            price: {
                amount: 4250,
                currency: "$" as const
            },
            spots: 0,
        },
        {
            _id: '51',
            date_start: '2025-01-21T00:00:00.000Z',
            date_finish: '2025-01-29T23:59:59.000Z',
            price: {
                amount: 3650,
                currency: "$" as const
            },
            spots: 3,
        },
        {
            _id: '52',
            date_start: '2025-03-08T00:00:00.000Z',
            date_finish: '2025-03-16T23:59:59.000Z',
            price: {
                amount: 3650,
                currency: "$" as const
            },
            spots: 15,
        },
    ],
    isPublished: false,

};

export const ToursAdmin = () => {

    const { data: tours } = useGetAllToursQuery({});
    console.log(tours);


    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >

            <Text type='h2' size='32' color='blue' font='geometria600'>
                Управление турами
            </Text>

            <Stack max gap="32" justify='between' wrap>
                <TourCardAdmin
                    title="Южная Америка: Патагония"
                    imageUrl="https://cf.youtravel.me/tr:w-1500/upload/tours/f9b/xqibcdntphopbuw7vvcvyt0hrcs5z69b.jpeg"
                    dates={data.dates}
                    tourId='5'
                    isPublished={data.isPublished}
                />

                <TourCardAdmin
                    title="Япония"
                    imageUrl="https://cf.youtravel.me/tr:w-1500/upload/tours/55706/media/695/lhceao233ty1148o3fe3ed7z76a727bb.jpg"
                    dates={data.dates}
                    tourId='5'
                    isPublished={data.isPublished}
                />

                <TourCardAdmin
                    title="Камчатка с Авачинским"
                    imageUrl="https://cf.youtravel.me/tr:w-1500/upload/tours/d62/4330ntarvmjcv0c89yv7l4asia2de081.JPG"
                    dates={data.dates}
                    tourId='5'
                    isPublished={data.isPublished}
                />
                <TourCardAdmin
                    title="Армения"
                    imageUrl="https://cf.youtravel.me/tr:w-1500/upload/tours/50753/media/626/whzoy620ntlbeyc1kerrd2mr1z7zaa53.jpeg"
                    dates={data.dates}
                    tourId='5'
                    isPublished={data.isPublished}
                />
            </Stack>
        </Stack>
    );
};