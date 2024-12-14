import { ArrowDropwownIcon } from "@/shared/assets/svg/arrowIcons";
import { CheckmarkIcon } from "@/shared/assets/svg/checkMarkIcon";
import { useToggleOpen } from "@/shared/hooks/useToggleOpen";
import { getStyles } from "@/shared/lib/getStyles";
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { useDispatch, useSelector } from "react-redux";
import { SortDataProps } from "../../lib/data";
import { getSortState, setSort } from "../../model/sortSlice";
import styles from './SortTourItem.module.scss'

interface SortTourItemProps {
    dataSort: SortDataProps[];
}

export const SortTourItem = ({ 
    dataSort } : SortTourItemProps ) => {

    const dispatch = useDispatch()
    const selectedSort = useSelector(getSortState)

    const { toggleMenu, isOpen, menuRef, closeMenu } = useToggleOpen()

    const handleChangeSort = (option: string, label: string) => {
        dispatch(setSort({ option, label }))
        closeMenu()
    }

    return(
        <Stack
            direction='column'
            gap='16'
            ref={menuRef}
            className={styles.sortTourContainer}
        >

            <Button
                color='outline'
                onClick={toggleMenu}
            >
                <Text
                    size='18'
                    color='blue'
                    font='geometria500'
                >
                    {selectedSort.label}
                </Text>
                <span className={getStyles(styles.icon, 
                    {[styles.rotateOpen]: isOpen, 
                    [styles.rotateClosed]: !isOpen}, [])}>
                    <ArrowDropwownIcon/>
                </span> 
            </Button>
            {isOpen && 
            <ul 
                className={styles.list}
            >
                {dataSort.map(item => (
                <li 
                    key={item._id}
                    onClick={() => handleChangeSort(item.value, item.label)}
                >
                    {item.label}
                    {selectedSort.option === item.value && 
                    <span><CheckmarkIcon /></span>}
                </li>
                ))}
            </ul>}
        </Stack>
    )
}