import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import styles from './PageTitle.module.scss'

interface PageTitleProps {
    children: JSX.Element;
}

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
    )
}