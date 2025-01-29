import { SearchIcon } from "@/shared/assets/svg/searchIcon";
import { RegionTours } from "../RegionTours/RegionTours";
import styles from "./SearchMainPage.module.scss";

export const SearchMainPage = () => {

    return (
        <div className={styles.wrapper}>
            <SearchIcon />
            <RegionTours placeholder="Найди свое приключение здесь..."/>
        </div>
    );
};