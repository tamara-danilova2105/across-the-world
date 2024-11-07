import { NavLink } from "react-router-dom";
import { routeConfig } from "@/app/router/lib/data";
import { getStyles } from "@/shared/lib/getStyles";
import { Stack } from "@/shared/ui/Stack";
import styles from './NavbarDesktop.module.scss';
import { Logo_main } from "@/shared/assets/svg/logo_main";
import { LogoFont } from "@/shared/assets/svg/logoFont";

export const NavbarDesktop = () => {
    return (
        <Stack
            max 
            justify='between'
            align="center"
            className={styles.navbar}
        >
            <Stack
                gap='8'
            >
                <Logo_main/>
                <LogoFont/>
            </Stack>

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