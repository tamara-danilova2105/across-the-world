import { Stack } from "@/shared/ui/Stack"
import { GuideData } from "../model/types";
import { Text } from "@/shared/ui/Text";
import styles from './GuideCard.module.scss';

interface GuideProps {
    guide: GuideData
}

export const GuideCard = ({ guide } : GuideProps) => {
    return(
        <Stack 
            className={styles.guide}
            key={guide._id}
            gap="16"
        >
            <img src={guide.image} alt={guide.name}
                className={styles.image}/>
            <Stack 
                className={styles.text}
                direction="column"
                gap="8"
            >
                <guide.svg size={100} className={styles.svg}/>
                <Text size="16" font="geometria500" 
                    color='blue'
                >
                    {guide.name}
                </Text>
                <Text>
                    {guide.story}
                </Text>
            </Stack>
        </Stack>
    )
}