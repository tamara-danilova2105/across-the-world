import { ArrowDropwownIcon } from "@/shared/assets/svg/arrowIcons";
import { CheckmarkIcon } from "@/shared/assets/svg/checkMarkIcon";
import { MobileSort } from "@/shared/assets/svg/mobileSort";
import { useResize } from "@/shared/hooks/useResize";
import { useToggleOpen } from "@/shared/hooks/useToggleOpen";
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { SortDataProps } from "../../lib/data";
import styles from './SortTourItem.module.scss'

interface SortTourItemProps {
    selectSort: string;
    dataSort: SortDataProps
}

export const SortTourItem = ({ 
    selectSort,
    dataSort } : SortTourItemProps ) => {

        const { toggleMenu, isOpen, menuRef, closeMenu } = useToggleOpen();
        const width = useResize();

    return(
        <Stack
            direction='column'
            gap='16'
            ref={menuRef}
            className={styles.sortTourContainer}
        >
            {width > 1280 ? 
            <Button
                color='outline'
                onClick={toggleMenu}
            >
                <Text
                    size='18'
                    color='blue'
                    font='geometria500'
                >
                    {selectSort}
                </Text>
                <span className={`${styles.icon} ${isOpen ? styles.rotateOpen : styles.rotateClosed}`}>
                    <ArrowDropwownIcon/>
                </span> 
            </Button>
                :
            <Button
                color='button'
                onClick={toggleMenu}
                className={styles.sort_button}
            >
                <MobileSort/>
            </Button>}
            
            {isOpen && 
            <ul 
                onClick={closeMenu}
                className={styles.list}
            >
                {dataSort.map(item => (
                <Text 
                    type='li' 
                    key={item._id}
                    size='18'
                    color='blue'
                >
                    {item.label}
                    <span><CheckmarkIcon/></span>
                </Text>
                ))}
            </ul>}
        </Stack>
    )
}