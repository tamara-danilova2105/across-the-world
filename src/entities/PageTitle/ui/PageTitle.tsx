import { ReactNode } from "react";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './PageTitle.module.scss';

interface PageTitleProps {
    children: ReactNode;
};

export const PageTitle = ({ children } : PageTitleProps) => {
    return (
        <Stack
            direction='column'
            align='center'
            justify='center'
            gap='24'
            className={styles.pageTitleContainer}
        >
            {children}
        </Stack>
    );
};
