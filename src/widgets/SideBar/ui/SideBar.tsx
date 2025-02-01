import { NavLink } from "react-router-dom";
import { sidebarItems } from "../lib/config";
import styles from './SideBar.module.scss';
import { Text } from "@/shared/ui/Text";
import { getStyles } from "@/shared/lib/getStyles";
import { getRouteAdminModerationReviews } from "@/app/router/lib/helper";
import { useGetReviewsQuery } from "@/entities/Review/api/api";
import { useState } from "react";

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: reviews } = useGetReviewsQuery({ isModeration: false });

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <>
            <div className={styles.burger_container}>
                <button
                    className={getStyles(styles.hamburger, { [styles.open]: isOpen }, [])}
                    onClick={toggleSidebar}
                >
                    <div className={styles.line_top}></div>
                    <div className={styles.line_middle}></div>
                    <div className={styles.line_bottom}></div>
                </button>
            </div>

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
                            onClick={toggleSidebar}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            {item.label}

                            {item.path === getRouteAdminModerationReviews() && reviews?.total > 0 && (
                                <span className={styles.badge}>{reviews.total}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside >
        </>
    );
};
