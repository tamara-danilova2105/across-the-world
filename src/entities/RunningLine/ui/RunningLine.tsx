import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './RunningLine.module.scss';
import logo from '@/shared/assets/png/logo_line.png'
import React from "react";

export const RunningLine = () => {
    
    const data = [
        {
            image: logo,
            text: 'РАНЕЕ БРОНИРОВАНИЕ - 8%'
        },
        {
            image: logo,
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
                max
            >
                {Array(4).fill(data).flat().map((item, index) => (
                    <React.Fragment key={index}>
                        <img src={item.image} alt=""/>
                        <Text font='geometria500' color="peach" size="24">
                            {item.text}
                        </Text>
                    </React.Fragment>
                ))}
            </Stack>
        </Stack>
    );
};