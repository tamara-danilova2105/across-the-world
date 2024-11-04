import { LessIcon } from "@/shared/assets/svg/lessIcon"
import { MoreIcon } from "@/shared/assets/svg/moreIcon"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { useState } from "react"
import styles from './Accordion.module.scss'
import { dataFAQ } from "@/widgets/FAQ/lib/data"
import { getStyles } from "@/shared/lib/getStyles"

interface AccordionProps {
    accordion: dataFAQ;
    isSecond: boolean;
}

export const Accordion = ({accordion, isSecond = false}: AccordionProps) => {

    const { question, answer } = accordion;

    const [isOpen, setIsOpen] = useState(isSecond || false); 

    const handleClick = () => {
        setIsOpen(prev => !prev)
    }

    const accordionStyles = getStyles(
        isOpen ? styles.openAnswer : styles.closedAnswer,
        {},
        [styles.accordionContainer]
    )

    return(
        <Stack 
            direction="column"
            onClick={handleClick}
            className={accordionStyles}
        >
            <Stack 
                direction="column"
                className={styles.accordion}
            >
                <Stack 
                    justify='between'
                    align='center'
                    className={styles.questionContainer}
                >
                    <Text size="24" font="geometria500">{question}</Text>
                    {isOpen ? <LessIcon/> : <MoreIcon/>}
                </Stack>
                <Stack className={isOpen ? styles.visible : styles.hidden}>
                    <Text size="18">{answer}</Text>
                </Stack>
            </Stack>
        </Stack>
    )
}