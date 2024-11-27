import { ArrowDropwownIcon } from "@/shared/assets/svg/arrowIcons";
import { CheckmarkIcon } from "@/shared/assets/svg/checkMarkIcon";
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { useEffect, useRef, useState } from "react";
import { SortDataProps } from "../../lib/data";
import styles from './SortTourItem.module.scss'

interface SortTourItemProps {
    selectSort: string;
    dataSort: SortDataProps
}

export const SortTourItem = ({ 
    selectSort,
    dataSort } : SortTourItemProps ) => {

        const [isOpen, setIsOpen] = useState(false);
        const sortRef = useRef()
    
        const toggleMenu = () => {
            setIsOpen(!isOpen);
        }
    
    
        useEffect(() => {
            const handleClickOutside = (event: UIEvent) => {
                if (sortRef.current && !sortRef.current.contains(event.target)) {
                    setIsOpen(false); 
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

    return(
        <Stack
            direction='column'
            gap='16'
            className={styles.sortTourContainer}
        >
            <Button
                color='outline'
                onClick={toggleMenu}
                ref={sortRef}
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
            {isOpen && 
            <ul 
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