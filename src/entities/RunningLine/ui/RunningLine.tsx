import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './RunningLine.module.scss';
import React from "react";
import { LogoIcon } from "@/shared/assets/svg/logoIcon";

interface RunningLineItem {
    icon: JSX.Element;
    text: string;
}

export const RunningLine = () => {
    
    const data: RunningLineItem[] = [
        {
            icon: <LogoIcon/>,
            text: 'РАНЕЕ БРОНИРОВАНИЕ - 8%'
        },
        {
            icon: <LogoIcon/>,
            text: 'ПОДПИСКА НА НОВОСТИ - 3%'
        },
    ];

    return (
        <Stack 
            className={styles.runningLine}
            justify="center"
        >
            <Stack 
                className={styles.runningText}
                justify="center"
                align="center"
                gap="16"
                max
            >
                {Array(9).fill(data).flat().map((item, index) => (
                    <React.Fragment key={index}>
                        {item.icon}
                        <Text font='geometria500' color="peach" size="24">
                            {item.text}
                        </Text>
                    </React.Fragment>
                ))}
            </Stack>
        </Stack>
    );
};