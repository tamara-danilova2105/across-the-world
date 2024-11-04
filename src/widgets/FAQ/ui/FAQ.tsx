import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import styles from './FAQ.module.scss';

export const FAQ = () => {
    return (
        <Stack tag='section' className={styles.main}>
            <TitleSection 
                subtitle="FAQ" 
                title="Есть вопросы? Посмотри здесь" 
            />
            
        </Stack>
    );
};