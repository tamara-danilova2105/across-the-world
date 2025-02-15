import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './Images.module.scss';
import { Text } from "@/shared/ui/Text/Text";
import { ImagesWithDetails } from "@/feature/EarlyBookEditor/model/types/types";
import { apiUrl } from "@/shared/api/endpoints";


interface ImagesProps {
    item: ImagesWithDetails;
    width?: string | number; 
    height?: string | number;
}

export const Images = ({ item, width, height } : ImagesProps) => {

    return (
        <Stack 
            width={width} 
            className={styles.imagesContainer}
            justify="center"
            align="center"
        >
            <img 
                src={`${apiUrl}${item.src}`}
                alt={item.describe} 
                style={{ height: typeof height === 'number' ? `${height}px` : height }}
                className={styles.image} 
            />
            <Stack
                direction="column"
                gap='8'
            >
                <Text color='white' size='18' font = 'geometria600'>{item.header}</Text>
                <Text color='white'>{item.category}</Text>
                <Text color='white' font = 'geometria500'>{item.describe}</Text>
            </Stack>
        </Stack>
    );
};