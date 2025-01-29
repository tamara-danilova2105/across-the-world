import { FilterBar } from "@/feature/FilterBar/index";
import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { RunningLine } from "@/entities/RunningLine/index";
import { dataRegion } from "@/entities/RunningLine/lib/data";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Tours } from "../Tours/Tours";
import { Search } from 'lucide-react';
import { SearchToursMain } from "@/feature/SearchTours/index";
import { getStyles } from "@/shared/lib/getStyles";
import { useOverflowHidden } from "@/shared/hooks/useOverflowHidden";
import { useToggleOpen } from "@/shared/hooks/useToggleOpen";
import { Text } from "@/shared/ui/Text/Text";
import styles from './ToursMain.module.scss';

export const ToursMain = () => {

    const width = useResize();
    const { isOpen, toggleMenu, menuRef } = useToggleOpen();
    useOverflowHidden(isOpen)

    return (
        <main>
            <BreadCrumbs>
                {width > 768
                    ? <SearchToursMain />
                    : <Stack
                        align='center'
                        gap='16'
                        className={styles.searchBlock}
                        onClick={toggleMenu}
                    >
                        <Search />
                        <Text
                            color='blue'
                            size='18'
                        >Куда отправимляемся?</Text>
                    </Stack> //TODO - надо сделать как на you travel, инпуты также остаются как и в десктопе, только меняют вертикальное направлени
                    // и в мобильной версии открывается модальное окно с опциями или календариком
                }
            </BreadCrumbs>
            {width <= 768 && (
                <Stack
                    align='end'
                    className={getStyles(styles.search,
                        { [styles.open]: isOpen, [styles.closed]: !isOpen }, [])}>
                    <SearchToursMain />
                </Stack>
            )}
            <Stack
                justify='center'
                align='center'
                ref={menuRef}
                max
                className={styles.region}
            >
                <RunningLine data={dataRegion} />
            </Stack>
            <Stack
                tag='section'
                gap='32'
                className={styles.tours_page}
            >
                {width > 1023 ? <FilterBar /> : ''}
                <Tours />
            </Stack>
        </main>
    );
};