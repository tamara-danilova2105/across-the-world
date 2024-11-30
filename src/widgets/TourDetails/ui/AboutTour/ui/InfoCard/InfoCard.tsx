import { ExclamatiomMarkIcon } from "@/shared/assets/svg/exclamatiomMarkIcon";
import { AppLink } from "@/shared/ui/AppLink";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ReactNode } from "react";
import styles from './InfoCard.module.scss';

interface InfoCardProps {
    children: ReactNode;
    category: string;
    categoryType: string;
    description: string;
    textLink: string;
    hrefLink: string;
};

export const InfoCard = (props: InfoCardProps) => {
    const { children, category, categoryType, description, textLink, hrefLink } = props;

    return (
        <Stack justify='between' align='center'>
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
                    >
                        {textLink}
                    </AppLink>
                </div>
            </Stack>
            {children}
        </Stack>
    )
}