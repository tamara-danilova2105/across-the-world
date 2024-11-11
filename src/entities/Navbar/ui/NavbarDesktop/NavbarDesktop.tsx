import { NavLink } from "react-router-dom";
import { routeConfig } from "@/app/router/lib/data";
import { getStyles } from "@/shared/lib/getStyles";
import { Stack } from "@/shared/ui/Stack/Stack";
import { LogoFont } from "@/shared/assets/svg/logoFont";
import { LogoIcon } from "@/shared/assets/svg/logoIcon";
import styles from './NavbarDesktop.module.scss';
import { InstagramIcon, TelegrmaIcon } from "@/shared/assets/svg/sotialMediaIcons";
import { PhoneIcon } from "@/shared/assets/svg/contactIcons";

export const NavbarDesktop = () => {

    return (
        <Stack
            max align="center"
            className={styles.navbar}
        >
            <Stack 
                max 
                justify="between"
                align="center"
                className={styles.navbarContainer}
            >
                <Stack 
                    gap='16' align="center"
                    className={styles.logo_container}
                >
                    <LogoIcon />
                    <LogoFont />
                </Stack>

                <Stack gap="48" tag="nav">
                    {Object.values(routeConfig).map(route => (
                        route.title && (
                            <NavLink 
                                key={route.path}
                                to={route.path}
                                className={({ isActive }) =>
                                    getStyles(styles.link, {[styles.opened_page]: isActive, [styles.default]: !isActive}, [])
                                }
                            >
                                {route.title}
                            </NavLink>
                        )
                    ))}
                </Stack>

                <Stack gap="32">
                    <TelegrmaIcon />
                    <InstagramIcon />
                    <PhoneIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};
