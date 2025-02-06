import { useLocation } from "react-router";
import { getRouteMain } from "@/app/router/lib/helper";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import styles from './NotFound.module.scss';

export const NotFound = () => {
    const { pathname } = useLocation();
    const isAdminPage = pathname.startsWith('/admin');
    
    return (
        <Stack
            max gap="32"
            direction='column'
            align='center'
            justify='center'
            className={!isAdminPage ? styles.not_found_main : styles.not_found_admin}
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