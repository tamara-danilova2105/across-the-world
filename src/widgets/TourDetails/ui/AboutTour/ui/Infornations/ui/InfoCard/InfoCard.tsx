import { MouseEvent, ReactNode, useCallback } from "react";
import { ExclamatiomMarkIcon } from "@/shared/assets/svg/exclamatiomMarkIcon";
import { AppLink } from "@/shared/ui/AppLink";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './InfoCard.module.scss';

interface InfoCardProps {
    children: ReactNode;
    category: string;
    categoryType: string;
    description: string;
    textLink: string;
    hrefLink: string;
};

const FIXED_HEIGHT_MENU = -80;

export const InfoCard = (props: InfoCardProps) => {
    const { children, category, categoryType, description, textLink, hrefLink } = props;

    const handleLinkClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = hrefLink.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const yOffset = FIXED_HEIGHT_MENU;
            const yPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
    
            window.scrollTo({
                top: yPosition,
                behavior: "smooth",
            });
        }
    }, [hrefLink]);

    return (
        <Stack justify='between' align='center' max>
            <Stack direction='column' gap="16">
                <Stack direction='column' gap="4">
                    <Text>{category}</Text>

                    <Stack gap="8" className={styles.tooltipContainer}>
                        <Text font='geometria500'>{categoryType}</Text>
                        
                        <div className={styles.tooltipWrapper}>
                            <ExclamatiomMarkIcon />
                            <div className={styles.tooltip}>
                                {description}
                            </div>
                        </div>
                    </Stack>
                </Stack>
                <div>
                    <AppLink 
                        to={hrefLink}
                        variant='link'
                        size="14"
                        onClick={handleLinkClick}
                    >
                        {textLink}
                    </AppLink>
                </div>
            </Stack>
            {children}
        </Stack>
    );
};
