import { SearchIcon } from "@/shared/assets/svg/searchIcon";
import styles from "./SearchTours.module.scss";

export const SearchTours = () => {
    //TODO - поиск тура, редирект на страницу с турами
    return (
        <div className={styles.wrapper}>
            <SearchIcon />
            <input
                className={styles.input}
                placeholder="Найди свое приключение здесь..."
            />
        </div>
    );
};
