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
            <img src={guide.image} alt={guide.name}/>
            <Stack 
                className={styles.text}
                direction="column"
                gap="8"
            >
                <Text size="16" font="geometria500" 
                    color='blue'
                >
                    {guide.name}
                </Text>
                <Text size="16">
                    {guide.story}
                </Text>
            </Stack>
        </Stack>
    )
}