import ReactPaginate from "react-paginate";
import { Stack } from "../../../shared/ui/Stack/Stack"
import styles from './Pagination.module.scss'

interface PaginationProps {
    onPageChange: (selected: number) => void;
    forcePage: number;
    pageCount: number;
}

export const Pagination = ({ onPageChange, forcePage, pageCount }: PaginationProps) => {

    const handlePageChange = (e: { selected: number }) => {
        onPageChange(e.selected);
    };
    return (
        <Stack
            className={styles.container}
            justify='center'
            align='center'
        >
            <ReactPaginate
                containerClassName={styles.paginationContainer}
                nextClassName={styles.next}
                previousClassName={styles.previous}
                activeClassName={styles.active}
                pageClassName={styles.page}
                onPageChange={handlePageChange}
                forcePage={forcePage}
                pageCount={pageCount}
                pageRangeDisplayed={3} 
                marginPagesDisplayed={1}
                breakLabel=". . ."
                breakClassName={styles.break}
            />
        </Stack>
    )
}