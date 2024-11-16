import { useState } from 'react';
import { Stack } from '@/shared/ui/Stack';
import { LogoIcon } from '@/shared/assets/svg/logoIcon';
import { LogoFont } from '@/shared/assets/svg/logoFont';
import { useOverflowHidden } from '@/shared/hooks/useOverflowHidden';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './NavbarMobile.module.scss';
import { routeConfig } from '@/app/router/lib/data';
import { NavLink } from 'react-router-dom';
import { InstagramIcon, TelegrmaIcon } from '@/shared/assets/svg/sotialMediaIcons';
import { PhoneIcon } from '@/shared/assets/svg/contactIcons';

export const NavbarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    useOverflowHidden(isOpen);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const renderLogo = () => {
        return (
            <Stack 
                gap='24' align="center"
                className={styles.logo_container}
            >
                <LogoIcon />
                <LogoFont />
            </Stack>
        );
    };

    return (
        <nav className={styles.navbar_mobile}>
            {renderLogo()}
            <button
                className={getStyles(styles.hamburger, {[styles.open]: isOpen}, [])}
                onClick={toggleMenu}
            >
                <div className={styles.line_top}></div>
                <div className={styles.line_middle}></div>
                <div className={styles.line_bottom}></div>
            </button>

            <ul className={getStyles(styles.menu, {[styles.menu_open]: isOpen}, [])}>
                <Stack 
                    direction='column'
                    align='center'
                    gap='24' max
                    className={styles.links_container}
                >
                    {Object.values(routeConfig).map(route => (
                        route.title && (
                            <NavLink 
                                key={route.path}
                                to={route.path}
                                role='li'
                                className={({ isActive }) =>
                                    getStyles(styles.link, {[styles.opened_page]: isActive }, [])
                                }
                                onClick={closeMenu}
                            >
                                {route.title}
                            </NavLink>
                        )
                    ))}
                </Stack>
                <Stack 
                    direction='column' 
                    gap='32' max
                    align='center'
                >
                    <Stack gap="32">
                        <TelegrmaIcon />
                        <InstagramIcon />
                        <PhoneIcon />
                    </Stack>
                    {renderLogo()}
                </Stack>
            </ul>
        </nav>
    )
}