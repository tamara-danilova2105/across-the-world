import { Pagination } from "@/entities/Pagination/index"
import { getFiltersState, setFilter } from "@/feature/FilterBar/model/filterSlice"
import { getSortState } from '@/feature/SortTour/model/sortSlice'
import { MobileFilterBar } from "@/widgets/Tours/ui/MobileFilterBar/ui/MobileFilterBar"
import { SortTour } from "@/feature/SortTour/index"
import { useModal } from "@/shared/hooks/useModal"
import { useToggleOpen } from "@/shared/hooks/useToggleOpen"
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { getStyles } from "@/shared/lib/getStyles"
import { Shedule } from "@/entities/Shedule"
import { Tour, TourCard, useGetAllToursQuery } from "@/entities/Tours"
import { useParams } from "react-router"
import { useDispatch } from "react-redux"
import { getCountryName } from "@/shared/lib/getCountryName"
import { NoResults } from "../NoResults/NoResults"
import { Skeleton } from "@/shared/ui/Skeleton"
import { useResize } from "@/shared/hooks/useResize"
import styles from './Tours.module.scss'
import { useDebounce } from "@/shared/hooks/useDebounce"

export const Tours = () => {

    const { region } = useParams()
    const dispatch = useDispatch()

    if (region) {
        const regions = getCountryName(region)
        dispatch(setFilter({ region: regions }))
    }

    const filters = useSelector(getFiltersState)
    const sorts = useSelector(getSortState)
    const readyFilter = JSON.stringify(filters);
    const readySort = JSON.stringify(sorts);

    const debouncedTours = useDebounce({ value: {
        filter: readyFilter,
        sort: readySort
    },  delay: 800})
    
    const { data, error, isLoading } = useGetAllToursQuery(debouncedTours)

    console.log(error) //todo

    const tours = data?.tours || [];
    const currentPage = data?.currentPage || 1;
    const totalPages = data?.totalPages || 1;

    const width = useResize()
    const isMobile = width <= 590

    const [changeModal, drawModal] = useModal(isMobile)
    const { isOpen, toggleMenu, menuRef } = useToggleOpen()

    const [currentIndex, setCurrentIndex] = useState(currentPage)

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
            {drawModal(<Shedule />)}

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
                        onClick={changeModal}
                        className={styles.button}
                    >
                        Расписание
                    </Button>
                </Stack>
            </Stack>
            <Stack gap="32" align="center" 
                wrap className={styles.our_tours}
            >
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} width="100%" height="500px" />
                    ))
                ) :  tours.length === 0 ? (
                    <NoResults />
                ) : (
                tours.map((tour: Tour) => (
                    <TourCard 
                        key={tour._id} 
                        tourData={tour}
                    />
                )))}
            </Stack>
            {totalPages > 1 && (
                <Pagination
                onPageChange={handlePageChange}
                forcePage={currentIndex}
                pageCount={totalPages}
                hasBackground={true}
                pagePagination={true}
            />)}
        </Stack>
    )
}