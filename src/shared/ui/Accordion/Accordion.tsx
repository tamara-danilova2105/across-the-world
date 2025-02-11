import { ReactNode, useState } from "react";
import { LessIcon } from "@/shared/assets/svg/lessIcon";
import { MoreIcon } from "@/shared/assets/svg/moreIcon";
import { Stack } from "@/shared/ui/Stack";
import { getStyles } from "@/shared/lib/getStyles";
import styles from './Accordion.module.scss';

interface AccordionProps {
    title: ReactNode;
    content: ReactNode;
    isSecond?: boolean;
};

export const Accordion = (props: AccordionProps) => {
    const { title, content, isSecond = false } = props;

    const [isOpen, setIsOpen] = useState(isSecond); 

    const handleClick = () => setIsOpen(prev => !prev);

    const accordionStyles = getStyles(
        isOpen ? styles.openAnswer : styles.closedAnswer,
        {},
        [styles.accordionContainer]
    );

    return(
        <Stack 
            direction="column"
            onClick={handleClick}
            className={accordionStyles}
        >
            <Stack 
                justify='between'
                align='center'
                className={styles.questionContainer}
                role="button"
                aria-expanded={isOpen}
            >
                {title}
                {isOpen ? <LessIcon/> : <MoreIcon/>}
            </Stack>

            <Stack 
                className={isOpen ? styles.visible : styles.hidden}
                aria-hidden={!isOpen}
            >
                {content}
            </Stack>
        </Stack>
    );
};
