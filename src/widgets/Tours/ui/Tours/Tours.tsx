import { Pagination } from "@/entities/Pagination/index"
import { TourCard } from "@/entities/TourCard/index"
import { getFiltersState } from "@/feature/FilterBar/model/filterSlice"
import { getSortState } from '@/feature/SortTour/model/sortSlice'
import { MobileFilterBar } from "@/feature/MobileFilterBar/ui/MobileFilterBar"
import { Shedule } from "@/feature/Shedule/index"
import { SortTour } from "@/feature/SortTour/index"
import { useModal } from "@/shared/hooks/useModal"
import { useToggleOpen } from "@/shared/hooks/useToggleOpen"
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { dataTours } from "@/widgets/OurTours/lib/data"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { getStyles } from "@/shared/lib/getStyles"
import { useGetAllToursQuery } from "../../api/toursApi"
import styles from './Tours.module.scss'

const LIMIT = 12;
const PAGE = 1;

export const Tours = () => {

    const filters = useSelector(getFiltersState)
    const sorts = useSelector(getSortState)

    const {
        data,
        error,
        isLoading } = useGetAllToursQuery({
            limit: LIMIT,
            page: PAGE,
            filters: {
                sort: sorts,
                filter: filters
            }
        })

    console.log(data, error, isLoading)

    const [changeModal, drawModal] = useModal();
    const { isOpen, toggleMenu, menuRef } = useToggleOpen();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePageChange = useCallback((pageIndex: number) => {
        setCurrentIndex(pageIndex);
    }, [])

    return (
        <Stack
            direction='column'
            gap='32'
            max
            className={styles.tours_container}
        >
            {drawModal(
                <Shedule />
            )}
            <Stack
                justify='end'
                max
                className={getStyles(styles.filter_panel, { [styles.open]: isOpen }, [])}
            >
                <MobileFilterBar
                    toggleMenu={toggleMenu}
                    isOpen={isOpen}
                    menuRef={menuRef}
                />
                <Stack
                    gap='16'
                    className={styles.filter_panel_btn}
                >
                    <SortTour />
                    <Button
                        cta
                        onClick={changeModal}
                        className={styles.button}
                    >
                        Расписание
                    </Button>
                </Stack>
            </Stack>
            <Stack
                gap="32"
                align='center'
                wrap
                className={styles.our_tours}
            >
                {dataTours.map((tour) => (
                    <TourCard
                        key={tour._id}
                        tourData={tour}
                    />
                ))}
                <Pagination
                    onPageChange={handlePageChange}
                    forcePage={currentIndex}
                    pageCount={3}
                    hasBackground={true}
                    pagePagination={true}
                />
            </Stack>
        </Stack>
    )
}