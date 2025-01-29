import { SearchIcon } from "@/shared/assets/svg/searchIcon";
import { Input } from "@/shared/ui/Input/Input";
import { RegionTours } from "../RegionTours/RegionTours";
import styles from "./SearchMainPage.module.scss";

export const SearchMainPage = () => {
    //TODO - поиск тура, редирект на страницу с турами
    return (
        <div className={styles.wrapper}>
            <SearchIcon />
            <RegionTours placeholder="Найди свое приключение здесь..."/>
        </div>
    );
};