import { Pagination } from "@/entities/Pagination/index"
import { TourCard } from "@/entities/TourCard/index"
import { MobileFilterBar } from "@/feature/MobileFilterBar/ui/MobileFilterBar"
import { Shedule } from "@/feature/Shedule/index"
import { SortTour } from "@/feature/SortTour/index"
import { useModal } from "@/shared/hooks/useModal"
import { useToggleOpen } from "@/shared/hooks/useToggleOpen"
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { dataTours } from "@/widgets/OurTours/lib/data"
import styles from './Tours.module.scss'

export const Tours = () => {

    const [changeModal, drawModal] = useModal();

    const { isOpen, toggleMenu, menuRef } = useToggleOpen();

    return(
        <Stack
            direction='column'
            gap='32'
            max
            className={styles.tours_container}
        >
            {drawModal(
                <Shedule/>
            )}
            <Stack
                justify='end'
                max
                className={`${styles.filter_panel} ${isOpen ? styles.open : ''}`}
            >
                <MobileFilterBar 
                    toggleMenu={toggleMenu} 
                    isOpen={isOpen} 
                    menuRef={menuRef}
                />
                <Stack
                    gap='16'
                >
                    <SortTour/>
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
                className={styles.our_tours}
            >
                {dataTours.map((tour) => (
                    <TourCard 
                        key={tour._id} 
                        tourData={tour} 
                    />
                ))}
                <Pagination
                    onPageChange={2}
                    forcePage={1}
                    pageCount={3}
                    hasBackground={true}
                    pagePagination={true}
                />
            </Stack>
        </Stack>
    )
}