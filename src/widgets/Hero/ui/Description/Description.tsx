
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { FireWorks } from "@/shared/assets/svg/heroIcons";
import { heroData } from "../../lib/data";
import styles from './Description.module.scss';
import { SearchToursMain } from "@/feature/SearchTours/index";

export const Description = () => {
    const { description } = heroData;

    return (
        <>
            <div className={styles.preview_container}>
                <SearchToursMain main/>
                <span>
                    <FireWorks />
                </span>
            </div>
            <Stack direction='column' gap="16">
                <Text type='h1' className={styles.header} font='unbounded'>
                    <span>Авторские туры</span> <br /> по России и миру
                </Text>
                <Text size="18" className={styles.description_text}>
                    {description}
                </Text>
            </Stack>
        </>
    );
};
