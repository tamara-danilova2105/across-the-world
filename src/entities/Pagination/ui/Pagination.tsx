import { getStyles } from "@/shared/lib/getStyles";
import ReactPaginate from "react-paginate";
import { Stack } from "../../../shared/ui/Stack/Stack";
import styles from './Pagination.module.scss';

interface PaginationProps {
    onPageChange: (selected: number) => void;
    forcePage: number;
    pageCount: number;
    hasBackground: boolean;
};

export const Pagination = (props: PaginationProps) => {
    const { onPageChange, forcePage, pageCount, hasBackground } = props;

    const handlePageChange = (e: { selected: number }) => {
        onPageChange(e.selected);
    }

    const bullitStyle = getStyles(styles.page, {[styles.whiteBullit]: hasBackground}, [])

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
                pageClassName={bullitStyle}
                onPageChange={handlePageChange}
                forcePage={forcePage}
                pageCount={pageCount}
                pageRangeDisplayed={pageCount <= 6 ? pageCount : 3} 
                marginPagesDisplayed={pageCount <= 6 ? 0 : 1}
                breakLabel={pageCount > 6 ? ". . ." : null} 
                breakClassName={styles.break}
            />
        </Stack>
    );
};
