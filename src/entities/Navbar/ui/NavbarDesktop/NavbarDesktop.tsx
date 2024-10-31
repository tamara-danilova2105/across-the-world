import { NavLink } from "react-router-dom";
import { routeConfig } from "@/app/router/lib/data";
import { getStyles } from "@/shared/lib/getStyles";
import { Stack } from "@/shared/ui/Stack";
import logo from '@/shared/assets/png/logo.png';
import styles from './NavbarDesktop.module.scss';

export const NavbarDesktop = () => {
    return (
        <Stack
            max 
            justify='between'
            align="center"
            className={styles.navbar}
        >
            <img className={styles.logo} src={logo} alt="кругосветка авторские туры" />

            <Stack gap="48" tag="nav">
                {Object.values(routeConfig).map(route => (
                    route.title && (
                        <NavLink 
                            key={route.path}
                            to={route.path}
                            className={({ isActive }) =>
                                getStyles(styles.link, {[styles.opened_page]: isActive, [styles.default]: !isActive}, [],)
                            }
                        >
                            {route.title}
                        </NavLink>
                    )
                ))}
            </Stack>
        </Stack>
    );
};