import { Stack } from "@/shared/ui/Stack";
import styles from './NotFound.module.scss';
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteMain } from "@/app/router/lib/helper";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";

export const NotFound = () => {
    return (
        <Stack
            max gap="32"
            direction='column'
            align='center'
            justify='center'
            className={styles.not_found}
        >
            <DecorationIcon />
            <DecorationIcon />

            <Stack
                direction='column' gap="32" 
                justify='center' align='center'
                className={styles.content}
            >
                <Text type="h1" color='blue' font='unbounded'>
                    404
                </Text>
                <Text type="h2" size='32' font='geometria500'>
                    Упс! Страница не найдена
                </Text>
                <Text size='24'>
                    К сожалению, страница не найдена. 
                    Проверьте правильность ссылки или вернитесь на главную страницу.
                </Text>
                <div className={styles.link}>
                    <AppLink
                        variant='button'
                        to={getRouteMain()}
                    >
                        На главную
                    </AppLink>
                </div>
            </Stack>
        </Stack>
    );
};