import { getRoutePrivacyPolicy } from "@/app/router/lib/helper";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Button } from "@/shared/ui/Button/Button";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { useEffect, useState } from "react";
import styles from './Cookie.module.scss'

export const Cookie = () => {

    const [isVisible, setIsVisible] = useState(false);

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
            justify='between'
            align='center'
            max
            gap='16'
            className={styles.cookie_banner}
        >
            <DecorationIcon />
            <DecorationIcon />

            <Stack
                direction='column'
                gap='16'
            >
                <Text size='16'
                    font='geometria500'
                    color='blue'>Мы используем cookies для улучшения вашего опыта на сайте.</Text>
                <Text
                    size='16'
                    font='geometria500'
                    color='blue'
                >
                    Чтобы узнать больше, ознакомьтесь с нашей <br/> 
                    <AppLink to={getRoutePrivacyPolicy()}>
                        политикой конфиденциальности
                    </AppLink>.
                </Text>
            </Stack>
            <Button onClick={handleAccept}>Принять</Button>
        </Stack>
    )
}