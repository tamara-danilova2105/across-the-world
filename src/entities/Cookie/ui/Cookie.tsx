import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getRoutePrivacyPolicy } from "@/app/router/lib/helper";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Button } from "@/shared/ui/Button/Button";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from './Cookie.module.scss'
import { useResize } from "@/shared/hooks/useResize";


export const Cookie = () => {
    const { pathname } = useLocation();
    if (pathname === "/admin") return null;

    const [isVisible, setIsVisible] = useState(false);
    const width = useResize();
    const isTablet = width <= 820;

    useEffect(() => {
        const cookieConsent = localStorage.getItem('cookieConsent')
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted')
        setIsVisible(false)
    };

    if (!isVisible) return null;

    return (
        <Stack
            align='center'
            max
            className={styles.cookie_banner}
        >
            <Stack
                justify='between'
                align='center'
                max gap='16'
                className={styles.cookie}
            >
                <Stack
                    direction='column'
                    gap='16'
                >
                    <Text
                        size='16'
                        font='geometria500'
                        color='blue'
                        className={styles.par}
                    >
                        Мы используем cookies для улучшения вашего опыта на сайте.
                    </Text>

                    {!isTablet && (
                        <Text
                            size='16'
                            font='geometria500'
                            color='blue'
                        >
                            Чтобы узнать больше, ознакомьтесь с нашей <AppLink size="16" to={getRoutePrivacyPolicy()}> политикой конфиденциальности</AppLink>.
                        </Text>
                    )}
                </Stack>
                <Button onClick={handleAccept}>
                    Принять
                </Button>
            </Stack>
        </Stack>
    )
}