import { NavLink } from "react-router-dom";
import { sidebarItems } from "../lib/config";
import styles from './SideBar.module.scss';
import { Text } from "@/shared/ui/Text";
import { getStyles } from "@/shared/lib/getStyles";

export const SideBar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <Text type="h2" size='24'>
                    Админ панель
                </Text>
            </div>
            <nav className={styles.nav}>
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            getStyles(styles.navItem, { [styles.navItemActive]: isActive }, [])
                        }
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside >
    );
};
