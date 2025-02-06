import ReactPaginate from "react-paginate";
import { getStyles } from "@/shared/lib/getStyles";
import { Stack } from "@/shared/ui/Stack";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    onPageChange?: (selected: number) => void;
    forcePage?: number; //текущая страницв
    pageCount: number;
    hasBackground?: boolean; //цвет булитов взависимости от цвета background
    pagePagination?: boolean; //отображения нумерации страниц 
};

export const Pagination = (props: PaginationProps) => {
    const { onPageChange, forcePage, pageCount, hasBackground, pagePagination } = props;

    const handlePageChange = (e: { selected: number }) => {
        onPageChange?.(e.selected);
    };

    const bullitStyle = getStyles(styles.page, {[styles.whiteBullit]: hasBackground}, []);
    const paginationStyle = getStyles(styles.paginationContainer, {[styles.paginationPageContainer]: pagePagination}, []);

    const pageRangeDisplayed = pageCount <= 6 ? pageCount : 3;
    const marginPagesDisplayed = pageCount <= 6 ? 0 : 1;

    return (
        <Stack
            className={styles.container}
            justify='center'
            align='center'
            role="navigation"
            aria-label="Pagination Navigation"
        >
            <ReactPaginate
                previousLabel={<span aria-label="Previous Page"><ChevronLeft /></span>}
                nextLabel={<span aria-label="Next Page"><ChevronRight/></span>}
                containerClassName={paginationStyle}
                nextClassName={styles.next}
                previousClassName={styles.previous}
                activeClassName={styles.active}
                disabledLinkClassName={styles.disabledLink}
                pageClassName={bullitStyle}
                onPageChange={handlePageChange}
                forcePage={forcePage}
                pageCount={pageCount}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={marginPagesDisplayed}
                breakLabel={pageCount > 6 ? <span aria-hidden="true">. . .</span> : null} 
                breakClassName={styles.break}
            />
        </Stack>
    );
};
