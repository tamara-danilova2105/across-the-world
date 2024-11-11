import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './Images.module.scss';
import { BookData } from '@/widgets/EarlyBook/lib/data';
import { Text } from "@/shared/ui/Text/Text";

interface ImagesProps {
    item: BookData;
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
                src={item.urlImage} 
                alt={item.description} 
                style={{ height: typeof height === 'number' ? `${height}px` : height }}
                className={styles.image} 
            />
            <Stack
                direction="column"
                gap='8'
            >
                <Text color='white' size='18' font = 'geometria600'>{item.title}</Text>
                <Text color='white'>{item.denomination}</Text>
                <Text color='white' font = 'geometria500'>{item.description}</Text>
            </Stack>
        </Stack>
    );
};